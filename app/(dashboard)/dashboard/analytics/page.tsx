'use client'
import Link from 'next/link'

const NAV = [
  { label: 'الرئيسية', href: '/dashboard' },
  { label: 'صالوني', href: '/salon-dashboard' },
  { label: 'الخدمات والأسعار', href: '/salon-dashboard' },
  { label: 'الحجوزات', href: '/dashboard/bookings' },
  { label: 'التقييمات', href: '/dashboard/reviews' },
  { label: 'الإحصائيات', href: '/dashboard/analytics', active: true },
  { label: 'الإعدادات', href: '/dashboard/settings' },
]

const STATS = [
  { label: 'المشاهدات هذا الشهر', value: '2,847', change: '+12%', up: true },
  { label: 'الحجوزات هذا الشهر', value: '38', change: '+8%', up: true },
  { label: 'معدل التحويل', value: '8.4%', change: '+2%', up: true },
  { label: 'متوسط قيمة الحجز', value: '320 ريال', change: '+5%', up: true },
]

const TOP_SERVICES = [
  { name: 'قص وتصفيف الشعر', bookings: 15, revenue: 1200 },
  { name: 'صبغ الشعر', bookings: 10, revenue: 2000 },
  { name: 'مكياج عرائس', bookings: 6, revenue: 3600 },
  { name: 'كيراتين وفرد', bookings: 5, revenue: 2000 },
  { name: 'مانيكير وباديكير', bookings: 8, revenue: 640 },
]

export default function AnalyticsPage() {
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">الإحصائيات</h1>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                }`}>{stat.change}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-5">الخدمات الأكثر طلباً</h2>
            <div className="space-y-4">
              {TOP_SERVICES.map((s, i) => (
                <div key={s.name} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">{s.name}</span>
                      <span className="text-sm text-gray-500">{s.bookings} حجز</span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full"
                        style={{ width: `${(s.bookings / 15) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-rose-600 w-24 text-left">{s.revenue} ريال</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}