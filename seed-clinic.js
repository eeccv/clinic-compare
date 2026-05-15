const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const clinic = await prisma.clinic.create({
    data: {
      id: '1',
      name: 'Salon Louz',
      slug: 'louz-salon',
      city: 'riyadh',
      address: 'Al Nuzha, Riyadh',
      phone: '0501234567',
      whatsapp: '966501234567',
      verified: true,
      featured: true,
    }
  })
  console.log('Created:', clinic.id)
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  prisma.$disconnect()
})