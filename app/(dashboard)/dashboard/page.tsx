// app/(dashboard)/dashboard/page.tsx
'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const STATS = [
  { label: 'إجمالي المشاهدات', value: '2,847', icon: '👁️', change: '+12%', up: true },
  { label: 'التقييمات الجديدة', value: '23', icon: '⭐', change: '+5%', up: true },
  { label: 'طلبات التواصل', value: '156', icon: '📞', change: '-3%', up: false },
  { label: 'معدل التحويل', value: '8.4%', icon: '📈', change: '+2%', up: true },
]

const RECENT_REVIEWS = [
  { id: '1', author: 'أم محمد', rating: 5, comment: 'خدمة ممتازة وطاقم محترف', date: '2024-12-10' },
  { id: '2', author: 'ريم العتيبي', rating: 4, comment: 'تجربة جيدة بشكل عام', date: '2024-12-08' },
  { id: '3', author: 'نورا', rating: 5, comment: 'أفضل عيادة في الرياض!', date: '2024-12-05' },
]

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'بانتظار التأكيد', color: 'bg-amber-50 text-amber-600' },
  CONFIRMED: { label: 'مؤكد', color: 'bg-green-50 text-green-600' },
  CANCELLED: { label: 'ملغي', color: 'bg-red-50 text-red-500' },
  COMPLETED: { label: 'مكتمل', color: 'bg-gray-50 text-gray-500' },
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/bookings?clinicId=1')
      .then(r => r.json())
      .then(data => setBookings(data.bookings || []))
      .catch(() => {})
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

  const pendingBookings = bookings.filter(b => b.status === 'PENDING')
  const otherBookings = bookings.filter(b => b.status !== 'PENDING')

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">💅 صالوني</Link>
          <nav className="space-y-1">
            {[
              { icon: '🏠', label: 'الرئيسية', href: '/dashboard', active: true },
              { icon: '💇‍♀️', label: 'صالوني', href: '/dashboard/clinic' },
              { icon: '✂️', label: 'الخدمات والأسعار', href: '/dashboard/services' },
              { icon: '📅', label: 'الحجوزات', href: '/dashboard/bookings' },
              { icon: '⭐', label: 'التقييمات', href: '/dashboard/reviews' },
              { icon: '📊', label: 'الإحصائيات', href: '/dashboard/analytics' },
              { icon: '⚙️', label: 'الإعدادات', href: '/dashboard/settings' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.icon === '📅' && pendingBookings.length > 0 && (
                  <span className="mr-auto bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingBookings.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-6 right-5 left-5">
            <div className="bg-rose-50 rounded-xl p-4 text-center">
              <p className="text-xs text-rose-600 font-medium mb-2">ترقية للحساب المميز</p>
              <button className="btn-primary text-xs py-2 px-4 w-full">ترقية الآن</button>
            </div>
          </div>
        </aside>

        <main className="flex-1 mr-64 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">مرحباً، صالون لوز 👋</h1>
              <p className="text-gray-500 text-sm mt-1">إليك ملخص أداء صالونك اليوم</p>
            </div>
            <Link href="/dashboard/clinic" className="btn-primary text-sm">تعديل الملف الشخصي</Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                  }`}>{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Pending Bookings */}
          {pendingBookings.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-5">
                <h2 className="font-bold text-gray-800">📅 حجوزات تنتظر تأكيدك</h2>
                <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingBookings.length} جديد
                </span>
              </div>
              <div className="space-y-4">
                {pendingBookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{b.clientName}</span>
                        <span className="text-xs text-gray-400">{b.clientPhone}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ✂️ {b.service?.name || 'خدمة'} &nbsp;|&nbsp;
                        📅 {new Date(b.date).toLocaleDateString('ar-SA')} &nbsp;|&nbsp;
                        🕐 {b.time}
                      </div>
                      <div className="text-sm font-bold text-rose-600">
                        {b.totalPrice} ريال
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(b.id, 'CONFIRMED')}
                        disabled={loadingId === b.id}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-xl transition-colors disabled:opacity-50">
                        ✅ قبول
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, 'CANCELLED')}
                        disabled={loadingId === b.id}
                        className="bg-red-100 hover:bg-red-200 text-red-600 text-sm py-2 px-4 rounded-xl transition-colors disabled:opacity-50">
                        ❌ رفض
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-6">
            {/* Recent Reviews */}
            <div className="col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-800">أحدث التقييمات</h2>
                <Link href="/dashboard/reviews" className="text-sm text-rose-500 hover:underline">عرض الكل</Link>
              </div>
              <div className="space-y-4">
                {RECENT_REVIEWS.map(rev => (
                  <div key={rev.id} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0">
                    <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center text-sm font-bold text-rose-600 flex-shrink-0">
                      {rev.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{rev.author}</span>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                      <div className="text-amber-400 text-xs mt-0.5">{'★'.repeat(rev.rating)}</div>
                      <p className="text-sm text-gray-600 mt-1">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent confirmed/cancelled bookings */}
              {otherBookings.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-50">
                  <h3 className="font-bold text-gray-700 mb-3 text-sm">آخر الحجوزات</h3>
                  <div className="space-y-2">
                    {otherBookings.slice(0, 3).map(b => (
                      <div key={b.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{b.clientName} — {b.service?.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_MAP[b.status]?.color}`}>
                          {STATUS_MAP[b.status]?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
                <div className="space-y-2">
                  {[
                    { label: 'إضافة خدمة جديدة', icon: '➕', href: '/dashboard/services/new' },
                    { label: 'تحديث الأسعار', icon: '💰', href: '/dashboard/services' },
                    { label: 'رد على التقييمات', icon: '💬', href: '/dashboard/reviews' },
                    { label: 'تحديث الصور', icon: '📸', href: '/dashboard/clinic' },
                  ].map(action => (
                    <Link key={action.href} href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 transition-colors text-sm text-gray-700 hover:text-rose-600">
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-rose-600 rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-2">🚀 حسابك المميز</h3>
                <p className="text-rose-100 text-xs leading-relaxed mb-3">ظهوري في أعلى نتائج البحث واحصلي على شارة التوثيق</p>
                <button className="bg-white text-rose-600 text-xs font-bold py-2 px-4 rounded-lg w-full">
                  ترقية الآن
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}