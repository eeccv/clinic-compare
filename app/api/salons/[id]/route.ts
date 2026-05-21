import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const salon = await prisma.clinic.findUnique({
      where: { id: params.id }
    })
    if (!salon) return NextResponse.json({ error: 'غير موجود' }, { status: 404 })
    return NextResponse.json({ salon })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, slug, city, address, phone, whatsapp, description, verified, featured } = body

    const salon = await prisma.clinic.update({
      where: { id: params.id },
      data: { name, slug, city, address, phone, whatsapp, description, verified, featured }
    })

    return NextResponse.json({ success: true, salon })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.clinic.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}