import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const salons = await prisma.clinic.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ salons })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, slug, city, address, phone, whatsapp, description, verified, featured } = body

    if (!name || !city) {
      return NextResponse.json({ error: 'الاسم والمدينة مطلوبان' }, { status: 400 })
    }

    const salon = await prisma.clinic.create({
      data: { name, slug, city, address, phone, whatsapp, description, verified, featured }
    })

    return NextResponse.json({ success: true, salon })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}