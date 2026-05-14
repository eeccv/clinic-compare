// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء إضافة البيانات التجريبية...')

  // Services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'botox' },
      update: {},
      create: { name: 'البوتوكس', slug: 'botox', category: 'حقن', description: 'حقن البوتوكس لتقليل التجاعيد' }
    }),
    prisma.service.upsert({
      where: { slug: 'filler' },
      update: {},
      create: { name: 'الفيلر', slug: 'filler', category: 'حقن', description: 'حقن الفيلر لملء الغضون' }
    }),
    prisma.service.upsert({
      where: { slug: 'laser' },
      update: {},
      create: { name: 'إزالة الشعر بالليزر', slug: 'laser', category: 'ليزر', description: 'إزالة الشعر الزائد بالليزر' }
    }),
  ])

  // Clinics
  const clinic1 = await prisma.clinic.upsert({
    where: { slug: 'louz-clinic' },
    update: {},
    create: {
      name: 'عيادة لوز للتجميل',
      slug: 'louz-clinic',
      description: 'عيادة متخصصة في أحدث تقنيات التجميل',
      city: 'riyadh',
      address: 'حي النزهة، شارع الأمير سلطان، الرياض',
      phone: '+966114567890',
      whatsapp: '+966501234567',
      verified: true,
      featured: true,
    }
  })

  // Services for clinic
  await prisma.clinicService.upsert({
    where: { clinicId_serviceId: { clinicId: clinic1.id, serviceId: services[0].id } },
    update: {},
    create: {
      clinicId: clinic1.id,
      serviceId: services[0].id,
      price: 800,
      priceMax: 1500,
      currency: 'SAR',
    }
  })

  // Reviews
  await prisma.review.create({
    data: {
      clinicId: clinic1.id,
      rating: 5,
      author: 'أم محمد',
      comment: 'عيادة رائعة والدكتورة محترفة جداً!'
    }
  })

  console.log('✅ تم إضافة البيانات بنجاح!')
}

main()
  .catch(console.error)
  .finally(async () => { await prisma.$disconnect() })
