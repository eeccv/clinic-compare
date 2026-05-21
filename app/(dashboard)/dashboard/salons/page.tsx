'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SalonsPage() {
  const [salons, setSalons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/salons')
      .then(r => r.json())
      .then(data => setSalons(data.salons || []))
      .finally(() => setLoading(false))
  }, [])

  const deleteSalon = async (id: string) => {
    if (!confirm('هل أنتِ متأكدة من الحذف؟')) return
    await fetch(`/api/salons/${id}`, { method: 'DELETE' })
    setSalons(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">💅 صالوني</Link>
          <nav className="space-y-1">
            {[
              { icon: '🏠', label: 'الرئيسية', href: '/dashboard' },
              { icon: '💇‍♀️', label: 'إدارة الصالونات', href: '/dashboard/salons', active: true },
              { icon: '📅', label: 'الحجوزات', href: '/dashboard/bookings' },
              { icon: '⭐', label: 'التقييمات', href: '/dashboard/reviews' },
              { icon: '⚙️', label: 'الإعدادات', href: '/dashboard/settings' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 mr-64 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">💇‍♀️ إدارة الصالونات</h1>
            <Link href="/dashboard/salons/new"
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-5 rounded-xl transition-colors">
              ➕ إضافة صالون
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">⏳ جاري التحميل...</div>
          ) : salons.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">💇‍♀️</div>
              <p className="text-gray-500 mb-4">لا يوجد صالونات بعد</p>
              <Link href="/dashboard/salons/new"
                className="bg-rose-600 text-white py-2 px-6 rounded-xl inline-block">
                إضافة أول صالون
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {salons.map(salon => (
                <div key={salon.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-3xl">
                      💇‍♀️
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{salon.name}</h3>
                        {salon.verified && <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full">✓ موثق</span>}
                        {salon.featured && <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full">⭐ مميز</span>}
                      </div>
                      <p className="text-sm text-gray-500">📍 {salon.city} — {salon.address || 'لا يوجد عنوان'}</p>
                      <p className="text-sm text-gray-400 mt-0.5">📞 {salon.phone || 'لا يوجد'} | 💬 {salon.whatsapp || 'لا يوجد'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/salons/${salon.id}/edit`}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm py-2 px-4 rounded-xl transition-colors">
                      ✏️ تعديل
                    </Link>
                    <button onClick={() => deleteSalon(salon.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-500 text-sm py-2 px-4 rounded-xl transition-colors">
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}