export const runtime = "nodejs";
import { NextResponse } from 'next/server'

interface LeadData {
  name: string
  phone: string
  email?: string
  procedure?: string
  treatment?: string
  message?: string
  source?: string
  formName?: string
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
  
  // Add message (truncated if too long)
  if (leadData.message) {
    const messagePreview = leadData.message.length > 100 
      ? `${leadData.message.substring(0, 100)}...` 
      : leadData.message;
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
        city_1: "",
        preferredtime: "",
        preferreddate: "",
        message: leadData.message || "",
        select_the_procedure: leadData.procedure || leadData.treatment || "",
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
        "Age": "",
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
          "text": `Procedure/Treatment: ${leadData.procedure || leadData.treatment || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Form Type: Popup Form`
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
 * Handle POST request for popup form
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

    // Set form name for popup form
    data.formName = 'website leads';
    data.source = data.source || 'swakkaya';

    // Send to TeleCRM
    let telecrmResponse = null;
    let telecrmError = null;

    try {
      telecrmResponse = await sendToTeleCRM(data);
      console.log('Popup form lead sent to TeleCRM successfully');
    } catch (error) {
      telecrmError = error;
      console.error('TeleCRM submission failed:', error instanceof Error ? error.message : String(error));
    }

    return NextResponse.json(
      {
        success: true,
        telecrmSynced: !telecrmError,
        telecrmResponse: telecrmResponse,
        telecrmError: telecrmError ? (telecrmError instanceof Error ? telecrmError.message : String(telecrmError)) : null,
        timestamp: new Date().toISOString(),
        formName: 'website leads',
        message: telecrmError 
          ? 'Form submitted but TeleCRM sync failed' 
          : 'Form submitted successfully and synced with TeleCRM'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Popup form submission error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error',
        referenceId: `ERR-${Date.now()}`,
        formName: 'website leads'
      },
      { status: 500 }
    )
  }
}