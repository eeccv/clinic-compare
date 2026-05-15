import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status },
      include: { clinic: true, service: true }
    })

    // إذا تم تأكيد الحجز، أرسل رابط واتساب
    let whatsappLink = null
    if (status === 'CONFIRMED') {
      const msg =
        `🌸 *تم تأكيد موعدك في ${booking.clinic.name}*\n\n` +
        `✂️ الخدمة: ${booking.service?.name || ''}\n` +
        `📅 التاريخ: ${new Date(booking.date).toLocaleDateString('ar-SA')}\n` +
        `🕐 الوقت: ${booking.time}\n` +
        `💰 السعر: ${booking.totalPrice} ريال\n\n` +
        `نراكِ قريباً 💕`

      const cleanPhone = booking.clientPhone.replace(/\D/g, '')
      const phone = cleanPhone.startsWith('0') ? '966' + cleanPhone.slice(1) : cleanPhone
      whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    }

    if (status === 'CANCELLED') {
      const msg =
        `🌸 *بخصوص موعدك في ${booking.clinic.name}*\n\n` +
        `نأسف لإبلاغك أنه لم يتم تأكيد موعدك.\n` +
        `يرجى التواصل معنا لإعادة الحجز 💕`

      const cleanPhone = booking.clientPhone.replace(/\D/g, '')
      const phone = cleanPhone.startsWith('0') ? '966' + cleanPhone.slice(1) : cleanPhone
      whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    }

    return NextResponse.json({ success: true, booking, whatsappLink })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}