import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error'],
    errorFormat: 'minimal',
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper functions for common operations
export const db = {
  // Lead operations
  lead: {
    create: (data: any) => prisma.lead.create({ data }),
    findById: (id: string) => prisma.lead.findUnique({ where: { id } }),
    findByPhone: (phone: string) => prisma.lead.findFirst({ where: { phone } }),
    updateStatus: (id: string, status: string) => 
      prisma.lead.update({ where: { id }, data: { status } }),
    markAsSynced: (id: string, telecrmId?: string) =>
      prisma.lead.update({
        where: { id },
        data: { 
          telecrmSynced: true, 
          telecrmId,
          syncedAt: new Date()
        }
      }),
  },
  
  // Health check
  health: () => prisma.$queryRaw`SELECT 1`,
}

// Connection helper
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}