// app/api/leads/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Use a singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

interface LeadData {
  name: string
  phone: string
  email?: string
  procedure?: string
  treatment?: string
  message?: string
  source?: string
  formName?: string
  concerns?: string
  hairProblems?: string
  city?: string
  age?: string
  pincode?: string
  hairLossStage?: string
  consent?: boolean
  whatsappNumber?: string
  womansAgeBracket?: string
  tryingDuration?: string
  isWhatsapp?: string
}

/**
 * Generate comprehensive form data string with all user details (for system notes)
 */
function generateFormDataString(leadData: LeadData): string {
  const details = [];

  // Add all available fields with their values
  if (leadData.name) details.push(`Name: ${leadData.name}`);
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`);
  if (leadData.email) details.push(`Email: ${leadData.email}`);
  if (leadData.procedure) details.push(`Procedure: ${leadData.procedure}`);
  if (leadData.treatment) details.push(`Treatment: ${leadData.treatment}`);
  if (leadData.source) details.push(`Source: ${leadData.source}`);
  if (leadData.pincode) details.push(`Pincode: ${leadData.pincode}`);
  if (leadData.city) details.push(`City: ${leadData.city}`);
  if (leadData.concerns) details.push(`Concerns: ${leadData.concerns}`);
  if (leadData.hairLossStage) details.push(`Hair Loss Stage: ${leadData.hairLossStage}`);
  if (leadData.womansAgeBracket) details.push(`Woman's Age: ${leadData.womansAgeBracket}`);
  if (leadData.tryingDuration) details.push(`Trying Duration: ${leadData.tryingDuration}`);
  
  // Add message (truncated if too long)
  if (leadData.message || leadData.hairProblems) {
    const messageText = leadData.message || leadData.hairProblems || '';
    const messagePreview = messageText.length > 100 
      ? `${messageText.substring(0, 100)}...` 
      : messageText;
    details.push(`Message: ${messagePreview}`);
  }

  // Join all details with " | " separator
  return details.join(' | ');
}

/**
 * Send lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: LeadData) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error('TELECRM_API_URL environment variable is not set')
  }

  if (!process.env.TELECRM_API_KEY) {
    throw new Error('TELECRM_API_KEY environment variable is not set')
  }

  try {
    // Generate comprehensive form data string with all user details (for system notes)
    const formDataString = generateFormDataString(leadData);

    // Get the form name and set appropriate defaults
    const formName = leadData.formName || 'website leads';
    let defaultSource = 'swakkaya';
    let defaultPageName = 'swakkaya';

    // Use provided source or set default based on form type
    const leadSource = leadData.source || defaultSource;
    const pageName = leadData.source || defaultPageName;

    // Prepare the TeleCRM payload according to their API structure
    const telecrmPayload = {
      fields: {
        Id: "", // Leave empty for new leads
        name: leadData.name,
        email: leadData.email || "",
        phone: leadData.phone.replace(/\D/g, ''), // Only digits
        city_1: leadData.city || leadData.pincode || "",
        preferredtime: "",
        preferreddate: "",
        message: leadData.message || leadData.hairProblems || "",
        select_the_procedure: leadData.procedure || leadData.treatment || leadData.concerns || "",
        Country: "",
        LeadID: "",
        "CreatedOn": new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        "Lead Stage": "",
        "Lead Status": "new",
        "Lead Request Type": "consultation",
        "PageName": pageName,
        "State": "",
        "Age": leadData.age || leadData.womansAgeBracket || "",
        "FormName": formName
      },
      actions: [
        {
          "type": "SYSTEM_NOTE",
          "text": `Form Name: ${formName}`
        },
        {
          "type": "SYSTEM_NOTE", 
          "text": `Complete Form Data: ${formDataString}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Lead Source: ${leadSource}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Procedure/Treatment: ${leadData.procedure || leadData.treatment || leadData.concerns || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Pincode: ${leadData.pincode || 'Not provided'}`
        }
      ]
    }

    console.log('Sending to TeleCRM:', {
      endpoint,
      payload: telecrmPayload
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'nextjs-website-integration',
        'Accept': 'application/json',
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    })

    // Handle empty responses
    if (response.status === 204) {
      clearTimeout(timeout)
      return { 
        status: 'success', 
        message: 'Lead created (204 No Content)',
        synced: true
      }
    }

    const responseText = await response.text()

    // Skip HTML responses
    if (
      responseText.trim().startsWith('<!DOCTYPE') ||
      responseText.trim().startsWith('<html') ||
      responseText.includes('<!DOCTYPE html>')
    ) {
      console.warn(`HTML response from ${endpoint}`, {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        bodyPreview: responseText.slice(0, 200),
      })
      throw new Error('TeleCRM returned HTML response instead of JSON')
    }

    // Parse JSON
    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from ${endpoint}`)
      }
      clearTimeout(timeout)
      return {
        ...data,
        synced: true
      }
    } catch {
      throw new Error(`Invalid JSON from ${endpoint}: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * Handle POST request for storing leads in database and sending to TeleCRM
 */
export async function POST(request: Request) {
  let data: LeadData;

  try {
    data = await request.json()

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone' },
        { status: 400 }
      )
    }

    // Set form name if not provided
    data.formName = data.formName || 'website leads';
    data.source = data.source || 'swakkaya';

    // STEP 1: Save to PostgreSQL database using Prisma
    console.log('Saving lead to database...');
    
    let dbLead;
    try {
      dbLead = await prisma.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          treatment: data.treatment || data.procedure || data.concerns || null,
          procedure: data.procedure || data.concerns || null,
          message: data.message || data.hairProblems || null,
          concerns: data.concerns || null,
          hairProblems: data.hairProblems || null,
          city: data.city || null,
          age: data.age || null,
          pincode: data.pincode || null,
          hairLossStage: data.hairLossStage || null,
          consent: data.consent || true,
          source: data.source,
          formName: data.formName,
          status: 'NEW',
          telecrmSynced: false,
          whatsappNumber: data.whatsappNumber || null,
          womansAgeBracket: data.womansAgeBracket || null,
          tryingDuration: data.tryingDuration || null,
          isWhatsapp: data.isWhatsapp || null,
        },
      });
      
      console.log('Lead saved to database with ID:', dbLead.id);
    } catch (dbError) {
      console.error('Database save failed:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save lead to database',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }

    // STEP 2: Send to TeleCRM
    let telecrmResponse = null;
    let telecrmError = null;
    let telecrmSynced = false;

    try {
      telecrmResponse = await sendToTeleCRM(data);
      telecrmSynced = true;
      console.log('Lead sent to TeleCRM successfully');
      
      // STEP 3: Update the lead with TeleCRM sync status
      if (dbLead) {
        await prisma.lead.update({
          where: { id: dbLead.id },
          data: {
            telecrmSynced: true,
            telecrmId: telecrmResponse?.id || telecrmResponse?.leadId || null,
            syncedAt: new Date(),
          },
        });
        console.log('Database lead updated with TeleCRM sync status');
      }
    } catch (error) {
      telecrmError = error;
      console.error('TeleCRM submission failed:', error instanceof Error ? error.message : String(error));
      
      // Update database to reflect TeleCRM sync failure
      if (dbLead) {
        await prisma.lead.update({
          where: { id: dbLead.id },
          data: {
            telecrmSynced: false,
            error: error instanceof Error ? error.message : 'TeleCRM sync failed',
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        leadId: dbLead.id,
        telecrmSynced: telecrmSynced,
        telecrmResponse: telecrmResponse,
        telecrmError: telecrmError ? (telecrmError instanceof Error ? telecrmError.message : String(telecrmError)) : null,
        timestamp: new Date().toISOString(),
        formName: data.formName,
        message: telecrmError 
          ? 'Form submitted to database but TeleCRM sync failed' 
          : 'Form submitted successfully to database and synced with TeleCRM'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Form submission error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error',
        referenceId: `ERR-${Date.now()}`,
        formName: data?.formName || 'unknown'
      },
      { status: 500 }
    )
  }
}

/**
 * Handle GET request to fetch leads for the admin dashboard
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const status = searchParams.get('status')
    const formName = searchParams.get('formName')
    const search = searchParams.get('search')

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }
    
    if (formName && formName !== 'all') {
      where.formName = formName
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { treatment: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    // Fetch leads from database
    const leads = await prisma.lead.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
    
    return NextResponse.json({
      success: true,
      leads,
      count: leads.length
    })
    
  } catch (error) {
    console.error('Error fetching leads:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leads',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Handle PATCH request to update lead status
 */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      )
    }
    
    const data = await request.json()
    
    // Update lead in database
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: data.status,
        ...(data.telecrmSynced !== undefined && { telecrmSynced: data.telecrmSynced }),
        ...(data.telecrmId && { telecrmId: data.telecrmId }),
        ...(data.error && { error: data.error }),
      }
    })
    
    return NextResponse.json({
      success: true,
      lead: updatedLead
    })
    
  } catch (error) {
    console.error('Error updating lead:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update lead',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}