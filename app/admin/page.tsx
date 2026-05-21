'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [salons, setSalons] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [tab, setTab] = useState('salons')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/salons').then(r => r.json()),
      fetch('/api/bookings').then(r => r.json()),
    ]).then(([salonsData, bookingsData]) => {
      setSalons(salonsData.salons || [])
      setBookings(bookingsData.bookings || [])
    }).finally(() => setLoading(false))
  }, [])

  const updateSalon = async (id: string, data: any) => {
    await fetch(`/api/salons/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSalons(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }

  const deleteSalon = async (id: string) => {
    if (!confirm('هل أنتِ متأكدة من الحذف؟')) return
    await fetch(`/api/salons/${id}`, { method: 'DELETE' })
    setSalons(prev => prev.filter(s => s.id !== id))
  }

  const stats = {
    total: salons.length,
    verified: salons.filter(s => s.verified).length,
    featured: salons.filter(s => s.featured).length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">لوحة الإدارة</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-rose-600">الموقع الرئيسي</Link>
            <span className="bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1 rounded-full">ADMIN</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'إجمالي الصالونات', value: stats.total, color: 'bg-rose-50 text-rose-600' },
            { label: 'موثقة', value: stats.verified, color: 'bg-green-50 text-green-600' },
            { label: 'مميزة', value: stats.featured, color: 'bg-amber-50 text-amber-600' },
            { label: 'حجوزات معلقة', value: stats.pending, color: 'bg-blue-50 text-blue-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { key: 'salons', label: 'الصالونات' },
            { key: 'bookings', label: 'الحجوزات' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                tab === t.key ? 'bg-rose-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">جاري التحميل...</div>
        ) : tab === 'salons' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{salons.length} صالون</p>
              <Link href="/dashboard/salons/new"
                className="bg-rose-600 text-white text-sm py-2 px-4 rounded-xl hover:bg-rose-700 transition-colors">
                إضافة صالون
              </Link>
            </div>

            {salons.map(salon => (
              <div key={salon.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{salon.name}</h3>
                      {salon.verified && (
                        <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full">موثق</span>
                      )}
                      {salon.featured && (
                        <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full">مميز</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{salon.city} {salon.address ? `— ${salon.address}` : ''}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{salon.phone || 'لا يوجد هاتف'} | {salon.whatsapp || 'لا يوجد واتساب'}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    <button onClick={() => updateSalon(salon.id, { verified: !salon.verified })}
                      className={`text-xs py-1.5 px-3 rounded-lg border transition-colors ${
                        salon.verified
                          ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                      }`}>
                      {salon.verified ? 'موثق' : 'توثيق'}
                    </button>
                    <button onClick={() => updateSalon(salon.id, { featured: !salon.featured })}
                      className={`text-xs py-1.5 px-3 rounded-lg border transition-colors ${
                        salon.featured
                          ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                      }`}>
                      {salon.featured ? 'مميز' : 'تمييز'}
                    </button>
                    <Link href={`/dashboard/salons/${salon.id}/edit`}
                      className="text-xs py-1.5 px-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      تعديل
                    </Link>
                    <button onClick={() => deleteSalon(salon.id)}
                      className="text-xs py-1.5 px-3 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{bookings.length} حجز</p>
            {bookings.map(b => (
              <div key={b.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{b.clientName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    b.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                    b.status === 'CONFIRMED' ? 'bg-green-50 text-green-600' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {b.status === 'PENDING' ? 'معلق' : b.status === 'CONFIRMED' ? 'مؤكد' : 'ملغي'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{b.clientPhone} | {b.clinic?.name}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date(b.date).toLocaleDateString('ar-SA')} | {b.time} | {b.totalPrice} ريال
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}