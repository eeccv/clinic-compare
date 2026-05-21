'use client'
import Link from 'next/link'

const REVIEWS = [
  { id: '1', author: 'أم محمد', rating: 5, comment: 'صالون رائع والأخت سارة محترفة جداً', date: '2024-12-10' },
  { id: '2', author: 'ريم العتيبي', rating: 4, comment: 'خدمة ممتازة وأسعار معقولة', date: '2024-12-08' },
  { id: '3', author: 'نورا السعيد', rating: 5, comment: 'أفضل صالون في الرياض', date: '2024-12-05' },
  { id: '4', author: 'سارة', rating: 3, comment: 'الخدمة جيدة لكن الانتظار طويل', date: '2024-11-20' },
]

const NAV = [
  { label: 'الرئيسية', href: '/dashboard' },
  { label: 'صالوني', href: '/salon-dashboard' },
  { label: 'الخدمات والأسعار', href: '/salon-dashboard' },
  { label: 'الحجوزات', href: '/dashboard/bookings' },
  { label: 'التقييمات', href: '/dashboard/reviews', active: true },
  { label: 'الإحصائيات', href: '/dashboard/analytics' },
  { label: 'الإعدادات', href: '/dashboard/settings' },
]

export default function ReviewsPage() {
  const avg = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">صالوني</Link>
          <nav className="space-y-1">
            {NAV.map(item => (
              <Link key={item.label} href={item.href}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 mr-64 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">التقييمات</h1>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl font-bold text-gray-800">{avg}</div>
              <div className="text-amber-400 mt-1">{'★'.repeat(Math.round(Number(avg)))}</div>
              <div className="text-sm text-gray-500 mt-1">متوسط التقييم</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl font-bold text-gray-800">{REVIEWS.length}</div>
              <div className="text-sm text-gray-500 mt-2">إجمالي التقييمات</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl font-bold text-gray-800">{REVIEWS.filter(r => r.rating >= 4).length}</div>
              <div className="text-sm text-gray-500 mt-2">تقييمات ممتازة</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-5 border-b border-gray-50">
              <h2 className="font-bold text-gray-800">جميع التقييمات</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {REVIEWS.map(rev => (
                <div key={rev.id} className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center text-sm font-bold text-rose-600">
                        {rev.author[0]}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{rev.author}</div>
                        <div className="text-amber-400 text-xs">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mr-12">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}