'use client'
import { useState } from 'react'
import Link from 'next/link'

const SALON = {
  id: '1',
  name: 'صالون لوز للتجميل',
  whatsapp: '966501234567',
  services: [
    { name: 'قص وتصفيف الشعر', price: 80 },
    { name: 'صبغ الشعر', price: 200 },
    { name: 'كيراتين وفرد', price: 400 },
    { name: 'مكياج عرائس', price: 600 },
    { name: 'مانيكير وباديكير', price: 80 },
    { name: 'إزالة الشعر', price: 50 },
  ],
}

const TIMES = ['09:00 ص', '10:00 ص', '11:00 ص', '12:00 م', '01:00 م', '02:00 م', '03:00 م', '04:00 م', '05:00 م', '06:00 م']
const BOOKED = ['10:00 ص', '02:00 م', '04:00 م']

function getDays() {
  const days = []
  const now = new Date()
  const dayNames = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']
  const monthNames = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
  for (let i = 0; i < 14; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    days.push({
      date: d,
      label: i === 0 ? 'اليوم' : i === 1 ? 'غداً' : dayNames[d.getDay()],
      day: d.getDate(),
      month: monthNames[d.getMonth()],
    })
  }
  return days
}

export default function BookPage({ params }: { params: { clinicId: string } }) {
  const [step, setStep] = useState(1)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [salonWaLink, setSalonWaLink] = useState('')
  const [clientWaLink, setClientWaLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const days = getDays()
  const service = SALON.services.find(s => s.name === selectedService)

  const confirmBooking = async () => {
    if (selectedDay === null || !selectedTime || !selectedService || !clientName || !clientPhone) return
    
    setLoading(true)
    setError('')

    try {
      const day = days[selectedDay]
      const bookingDate = new Date(day.date)

      // حفظ الحجز في قاعدة البيانات
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId: SALON.id,
          clientName,
          clientPhone,
          date: bookingDate.toISOString(),
          time: selectedTime,
          serviceName: selectedService,
          totalPrice: service?.price,
        }),
      })

      if (!res.ok) throw new Error('فشل الحجز')

      // بناء رسائل واتساب
      const invoice =
        `🌸 *طلب موعد جديد — ${SALON.name}*\n\n` +
        `👤 الاسم: ${clientName}\n` +
        `📱 الجوال: ${clientPhone}\n` +
        `✂️ الخدمة: ${selectedService}\n` +
        `📅 التاريخ: ${day.label} ${day.day} ${day.month}\n` +
        `🕐 الوقت: ${selectedTime}\n` +
        `💰 السعر: ${service?.price} ريال\n\n` +
        `يرجى تأكيد الموعد 💕`

      const clientMsg =
        `🌸 *تم استلام طلب حجزك في ${SALON.name}*\n\n` +
        `✂️ الخدمة: ${selectedService}\n` +
        `📅 التاريخ: ${day.label} ${day.day} ${day.month}\n` +
        `🕐 الوقت: ${selectedTime}\n` +
        `💰 السعر: ${service?.price} ريال\n\n` +
        `⏳ سيتم تأكيد موعدك قريباً من الصالون`

      const cleanPhone = clientPhone.replace(/\D/g, '')
      const phone = cleanPhone.startsWith('0') ? '966' + cleanPhone.slice(1) : cleanPhone

      setSalonWaLink(`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(invoice)}`)
      setClientWaLink(`https://wa.me/${phone}?text=${encodeURIComponent(clientMsg)}`)
      setStep(4)

    } catch (err) {
      setError('حدث خطأ أثناء الحجز، حاولي مرة أخرى')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-rose-600">💅 صالوني</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-600">حجز موعد</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">

          <div className="bg-rose-600 text-white p-6 text-center">
            <div className="text-4xl mb-2">💇‍♀️</div>
            <h1 className="text-xl font-bold">{SALON.name}</h1>
            <p className="text-rose-100 text-sm mt-1">احجزي موعدك بسهولة</p>
          </div>

          {step < 4 && (
            <div className="flex border-b border-rose-50">
              {['الخدمة', 'التاريخ', 'بياناتك'].map((s, i) => (
                <div key={i} className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  step === i + 1 ? 'text-rose-600 border-b-2 border-rose-600' :
                  step > i + 1 ? 'text-green-500' : 'text-gray-400'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}. {s}
                </div>
              ))}
            </div>
          )}

          <div className="p-6">

            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="font-bold text-lg mb-4 text-gray-800">اختاري الخدمة</h2>
                <div className="space-y-3">
                  {SALON.services.map(s => (
                    <button key={s.name} onClick={() => setSelectedService(s.name)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        selectedService === s.name ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'
                      }`}>
                      <span className="font-medium text-gray-800">{s.name}</span>
                      <span className="font-bold text-rose-600">{s.price} ريال</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} disabled={!selectedService}
                  className="w-full mt-6 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 rounded-xl transition-colors">
                  التالي — اختاري الموعد ←
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="font-bold text-lg mb-4 text-gray-800">اختاري التاريخ</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                  {days.map((d, i) => (
                    <button key={i} onClick={() => { setSelectedDay(i); setSelectedTime(null) }}
                      className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 min-w-[70px] transition-all ${
                        selectedDay === i ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'
                      }`}>
                      <span className="text-xs text-gray-500">{d.label}</span>
                      <span className="text-xl font-bold text-gray-800 mt-1">{d.day}</span>
                      <span className="text-xs text-gray-400">{d.month}</span>
                    </button>
                  ))}
                </div>

                {selectedDay !== null && (
                  <>
                    <h2 className="font-bold text-lg mb-4 text-gray-800">اختاري الوقت</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {TIMES.map(t => {
                        const booked = BOOKED.includes(t)
                        return (
                          <button key={t} disabled={booked} onClick={() => setSelectedTime(t)}
                            className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              booked ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' :
                              selectedTime === t ? 'border-rose-500 bg-rose-50 text-rose-600' :
                              'border-gray-100 hover:border-rose-200 text-gray-700'
                            }`}>
                            {booked ? '🚫' : '🕐'} {t}
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border border-rose-200 text-rose-600 font-medium py-3 rounded-xl">
                    → رجوع
                  </button>
                  <button onClick={() => setStep(3)} disabled={selectedDay === null || !selectedTime}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 rounded-xl transition-colors">
                    التالي ←
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="font-bold text-lg mb-4 text-gray-800">بياناتك</h2>

                {selectedDay !== null && (
                  <div className="bg-rose-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">الخدمة</span>
                      <span className="font-medium">{selectedService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">التاريخ</span>
                      <span className="font-medium">{days[selectedDay].label} {days[selectedDay].day} {days[selectedDay].month}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">الوقت</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-t border-rose-100 pt-2 mt-2">
                      <span className="font-bold text-gray-700">السعر</span>
                      <span className="font-bold text-rose-600">{service?.price} ريال</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">الاسم</label>
                    <input value={clientName} onChange={e => setClientName(e.target.value)}
                      placeholder="اكتبي اسمك الكريم"
                      className="w-full px-4 py-3 border border-rose-100 rounded-xl outline-none focus:border-rose-400 text-right" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">رقم الجوال</label>
                    <input value={clientPhone} onChange={e => setClientPhone(e.target.value)}
                      placeholder="05xxxxxxxx"
                      className="w-full px-4 py-3 border border-rose-100 rounded-xl outline-none focus:border-rose-400 text-right" />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 border border-rose-200 text-rose-600 font-medium py-3 rounded-xl">
                    → رجوع
                  </button>
                  <button onClick={confirmBooking} disabled={!clientName || !clientPhone || loading}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 rounded-xl transition-colors">
                    {loading ? '⏳ جاري الحجز...' : '✅ تأكيد الحجز'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && selectedDay !== null && (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">تم استلام طلب حجزك!</h2>
                <p className="text-gray-500 text-sm mb-2">⏳ سيتم تأكيد موعدك من الصالون قريباً</p>
                <p className="text-gray-400 text-xs mb-6">اضغطي لإرسال تفاصيل الحجز عبر واتساب</p>

                <div className="bg-rose-50 rounded-xl p-5 text-right space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">الاسم</span>
                    <span className="font-medium">{clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الخدمة</span>
                    <span className="font-medium">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">التاريخ</span>
                    <span className="font-medium">{days[selectedDay].label} {days[selectedDay].day} {days[selectedDay].month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الوقت</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-t border-rose-100 pt-3">
                    <span className="font-bold">السعر</span>
                    <span className="font-bold text-rose-600">{service?.price} ريال</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href={salonWaLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors">
                    💬 إرسال طلب الحجز للصالون
                  </a>
                  <a href={clientWaLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 rounded-xl transition-colors">
                    📱 إرسال تفاصيل الحجز لجوالي
                  </a>
                  <Link href="/" className="block w-full border border-rose-200 text-rose-600 font-medium py-3 rounded-xl text-center">
                    العودة للرئيسية
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}