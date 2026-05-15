import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status },
      include: { clinic: true, service: true }
    })

    const cleanPhone = booking.clientPhone.replace(/\D/g, '')
    const phone = cleanPhone.startsWith('0') ? '966' + cleanPhone.slice(1) : cleanPhone

    if (status === 'CONFIRMED') {
      const msg =
        `🌸 تم تأكيد موعدك في ${booking.clinic.name}\n\n` +
        `✂️ الخدمة: ${booking.service?.name || ''}\n` +
        `📅 التاريخ: ${new Date(booking.date).toLocaleDateString('ar-SA')}\n` +
        `🕐 الوقت: ${booking.time}\n` +
        `💰 السعر: ${booking.totalPrice} ريال\n\n` +
        `نراكِ قريباً 💕`

      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:+${phone}`,
        body: msg,
      })
    }

    if (status === 'CANCELLED') {
      const msg =
        `🌸 بخصوص موعدك في ${booking.clinic.name}\n\n` +
        `نأسف لإبلاغك أنه لم يتم تأكيد موعدك.\n` +
        `يرجى التواصل معنا لإعادة الحجز 💕`

      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:+${phone}`,
        body: msg,
      })
    }

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}