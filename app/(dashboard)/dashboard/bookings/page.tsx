'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'بانتظار التأكيد', color: 'bg-amber-50 text-amber-600' },
  CONFIRMED: { label: 'مؤكد', color: 'bg-green-50 text-green-600' },
  CANCELLED: { label: 'ملغي', color: 'bg-red-50 text-red-500' },
  COMPLETED: { label: 'مكتمل', color: 'bg-gray-50 text-gray-500' },
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetch('/api/bookings?clinicId=1')
      .then(r => r.json())
      .then(data => setBookings(data.bookings || []))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      }
    } finally {
      setLoadingId(null)
    }
  }

  const filtered = filter === 'ALL' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">💅 صالوني</Link>
          <nav className="space-y-1">
            {[
              { icon: '🏠', label: 'الرئيسية', href: '/dashboard' },
              { icon: '💇‍♀️', label: 'صالوني', href: '/dashboard/clinic' },
              { icon: '✂️', label: 'الخدمات والأسعار', href: '/dashboard/services' },
              { icon: '📅', label: 'الحجوزات', href: '/dashboard/bookings', active: true },
              { icon: '⭐', label: 'التقييمات', href: '/dashboard/reviews' },
              { icon: '📊', label: 'الإحصائيات', href: '/dashboard/analytics' },
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 الحجوزات</h1>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === s ? 'bg-rose-600 text-white' : 'bg-white border border-rose-100 text-gray-600 hover:border-rose-300'
                }`}>
                {s === 'ALL' ? 'الكل' : STATUS_MAP[s]?.label}
                <span className="mr-2 bg-white/20 px-1.5 rounded-full text-xs">
                  {s === 'ALL' ? bookings.length : bookings.filter(b => b.status === s).length}
                </span>
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
                <div className="text-5xl mb-3">📭</div>
                <p>لا توجد حجوزات</p>
              </div>
            ) : filtered.map(b => (
              <div key={b.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800 text-lg">{b.clientName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_MAP[b.status]?.color}`}>
                        {STATUS_MAP[b.status]?.label}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">📱 {b.clientPhone}</div>
                    <div className="flex gap-4 text-sm text-gray-600 mt-2">
                      <span>✂️ {b.service?.name || 'خدمة'}</span>
                      <span>📅 {new Date(b.date).toLocaleDateString('ar-SA')}</span>
                      <span>🕐 {b.time}</span>
                      <span className="font-bold text-rose-600">💰 {b.totalPrice} ريال</span>
                    </div>
                  </div>

                  {b.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(b.id, 'CONFIRMED')}
                        disabled={loadingId === b.id}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-5 rounded-xl transition-colors disabled:opacity-50">
                        ✅ قبول
                      </button>
                      <button onClick={() => updateStatus(b.id, 'CANCELLED')}
                        disabled={loadingId === b.id}
                        className="bg-red-100 hover:bg-red-200 text-red-600 text-sm py-2 px-5 rounded-xl transition-colors disabled:opacity-50">
                        ❌ رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}