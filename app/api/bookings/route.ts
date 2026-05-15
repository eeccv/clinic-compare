import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clinicId, clientName, clientPhone, clientEmail, date, time, serviceName, totalPrice } = body

    if (!clinicId || !clientName || !clientPhone || !date || !time) {
      return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 })
    }

    const service = await prisma.service.findFirst({
      where: { name: serviceName }
    })

    const booking = await prisma.booking.create({
      data: {
        clientName,
        clientPhone,
        clientEmail,
        date: new Date(date),
        time,
        totalPrice,
        status: 'PENDING',
        clinic: { connect: { id: clinicId } },
        ...(service ? { service: { connect: { id: service.id } } } : {}),
      },
      include: { clinic: true, service: true }
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const clinicId = searchParams.get('clinicId')
    const status = searchParams.get('status')

    const bookings = await prisma.booking.findMany({
      where: {
        ...(clinicId ? { clinicId } : {}),
        ...(status ? { status: status as any } : {}),
      },
      include: { clinic: true, service: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}