'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const TABS = [
  { key: 'bookings', label: 'الحجوزات' },
  { key: 'services', label: 'الخدمات والأسعار' },
  { key: 'offers', label: 'العروض' },
  { key: 'profile', label: 'ملف الصالون' },
]

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'بانتظار التأكيد', color: 'bg-amber-50 text-amber-600' },
  CONFIRMED: { label: 'مؤكد', color: 'bg-green-50 text-green-600' },
  CANCELLED: { label: 'ملغي', color: 'bg-red-50 text-red-500' },
  COMPLETED: { label: 'مكتمل', color: 'bg-gray-50 text-gray-500' },
}

export default function SalonDashboardPage() {
  const [tab, setTab] = useState('bookings')
  const [bookings, setBookings] = useState<any[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [services, setServices] = useState([
    { id: '1', name: 'قص وتصفيف الشعر', price: 80, priceMax: 200 },
    { id: '2', name: 'صبغ الشعر', price: 200, priceMax: 600 },
    { id: '3', name: 'كيراتين وفرد', price: 400, priceMax: 900 },
    { id: '4', name: 'مكياج عرائس', price: 600, priceMax: 1500 },
    { id: '5', name: 'مانيكير وباديكير', price: 80, priceMax: 150 },
    { id: '6', name: 'إزالة الشعر', price: 50, priceMax: 200 },
  ])
  const [offers, setOffers] = useState([
    { id: '1', title: 'عرض العروس', description: 'مكياج + تسريحة + مانيكير', price: 800, active: true },
  ])
  const [profile, setProfile] = useState({
    name: 'صالون لوز للتجميل',
    city: 'الرياض',
    address: 'حي النزهة، شارع الأمير سلطان',
    phone: '0501234567',
    whatsapp: '966501234567',
    description: 'مشغل نسائي متخصص في خدمات الشعر والمكياج',
  })

  const [newService, setNewService] = useState({ name: '', price: '', priceMax: '' })
  const [newOffer, setNewOffer] = useState({ title: '', description: '', price: '' })

  useEffect(() => {
    fetch('/api/bookings?clinicId=1')
      .then(r => r.json())
      .then(data => setBookings(data.bookings || []))
  }, [])

  const updateBooking = async (id: string, status: string) => {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    } finally {
      setLoadingId(null)
    }
  }

  const addService = () => {
    if (!newService.name || !newService.price) return
    setServices(prev => [...prev, {
      id: Date.now().toString(),
      name: newService.name,
      price: Number(newService.price),
      priceMax: Number(newService.priceMax) || Number(newService.price),
    }])
    setNewService({ name: '', price: '', priceMax: '' })
  }

  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id))

  const addOffer = () => {
    if (!newOffer.title || !newOffer.price) return
    setOffers(prev => [...prev, {
      id: Date.now().toString(),
      title: newOffer.title,
      description: newOffer.description,
      price: Number(newOffer.price),
      active: true,
    }])
    setNewOffer({ title: '', description: '', price: '' })
  }

  const pendingBookings = bookings.filter(b => b.status === 'PENDING')

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-800 text-sm">{profile.name}</h1>
            <p className="text-xs text-gray-400">لوحة تحكم الصالون</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-rose-600">الموقع الرئيسي</Link>
            {pendingBookings.length > 0 && (
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {pendingBookings.length} حجز جديد
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'إجمالي الحجوزات', value: bookings.length },
            { label: 'بانتظار التأكيد', value: pendingBookings.length },
            { label: 'مؤكدة', value: bookings.filter(b => b.status === 'CONFIRMED').length },
            { label: 'الخدمات', value: services.length },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
                <p>لا توجد حجوزات بعد</p>
              </div>
            ) : bookings.map(b => (
              <div key={b.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">{b.clientName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_MAP[b.status]?.color}`}>
                        {STATUS_MAP[b.status]?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{b.clientPhone}</p>
                    <div className="flex gap-3 text-sm text-gray-600 mt-1">
                      <span>{b.service?.name || 'خدمة'}</span>
                      <span>{new Date(b.date).toLocaleDateString('ar-SA')}</span>
                      <span>{b.time}</span>
                      <span className="font-bold text-rose-600">{b.totalPrice} ريال</span>
                    </div>
                  </div>
                  {b.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateBooking(b.id, 'CONFIRMED')}
                        disabled={loadingId === b.id}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-xl disabled:opacity-50">
                        قبول
                      </button>
                      <button onClick={() => updateBooking(b.id, 'CANCELLED')}
                        disabled={loadingId === b.id}
                        className="bg-red-100 hover:bg-red-200 text-red-600 text-sm py-2 px-4 rounded-xl disabled:opacity-50">
                        رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'services' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">إضافة خدمة جديدة</h2>
              <div className="grid grid-cols-3 gap-3">
                <input value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})}
                  placeholder="اسم الخدمة"
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-400 text-right" />
                <input value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})}
                  placeholder="السعر (ريال)" type="number"
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-400 text-right" />
                <input value={newService.priceMax} onChange={e => setNewService({...newService, priceMax: e.target.value})}
                  placeholder="أقصى سعر (اختياري)" type="number"
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-400 text-right" />
              </div>
              <button onClick={addService}
                className="mt-3 bg-rose-600 hover:bg-rose-700 text-white text-sm py-2 px-5 rounded-xl transition-colors">
                إضافة
              </button>
            </div>

            <div className="space-y-3">
              {services.map(s => (
                <div key={s.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-800">{s.name}</span>
                    <span className="text-rose-600 font-bold mr-3">{s.price} ريال</span>
                    {s.priceMax > s.price && <span className="text-gray-400 text-sm">— {s.priceMax} ريال</span>}
                  </div>
                  <button onClick={() => deleteService(s.id)}
                    className="text-red-400 hover:text-red-600 text-sm border border-red-200 px-3 py-1 rounded-lg">
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'offers' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">إضافة عرض جديد</h2>
              <div className="space-y-3">
                <input value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})}
                  placeholder="اسم العرض"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-400 text-right" />
                <input value={newOffer.description} onChange={e => setNewOffer({...newOffer, description: e.target.value})}
                  placeholder="وصف العرض"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-400 text-right" />
                <input value={newOffer.price} onChange={e => setNewOffer({...newOffer, price: e.target.value})}
                  placeholder="سعر العرض (ريال)" type="number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-rose-400 text-right" />
              </div>
              <button onClick={addOffer}
                className="mt-3 bg-rose-600 hover:bg-rose-700 text-white text-sm py-2 px-5 rounded-xl transition-colors">
                إضافة العرض
              </button>
            </div>

            <div className="space-y-3">
              {offers.map(o => (
                <div key={o.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800">{o.title}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{o.description}</div>
                    <div className="text-rose-600 font-bold mt-1">{o.price} ريال</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${o.active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                      {o.active ? 'فعّال' : 'متوقف'}
                    </span>
                    <button onClick={() => setOffers(prev => prev.filter(x => x.id !== o.id))}
                      className="text-red-400 hover:text-red-600 text-sm border border-red-200 px-3 py-1 rounded-lg">
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-2xl">
            <h2 className="font-bold text-gray-800 mb-5">معلومات الصالون</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">اسم الصالون</label>
                  <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">المدينة</label>
                  <input value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">العنوان</label>
                <input value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">رقم الهاتف</label>
                  <input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">واتساب</label>
                  <input value={profile.whatsapp} onChange={e => setProfile({...profile, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">وصف الصالون</label>
                <textarea value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm resize-none" />
              </div>
              <button className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                حفظ التعديلات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}