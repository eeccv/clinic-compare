import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status },
      include: { clinic: true, service: true }
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}