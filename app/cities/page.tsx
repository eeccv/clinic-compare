// app/cities/page.tsx
import Link from 'next/link'
import { SAUDI_CITIES } from '@/lib/types'

const CITY_STATS = [
  { name: 'riyadh', count: 187, topService: 'البوتوكس' },
  { name: 'jeddah', count: 134, topService: 'الليزر' },
  { name: 'makkah', count: 45, topService: 'العناية بالبشرة' },
  { name: 'madinah', count: 32, topService: 'الفيلر' },
  { name: 'dammam', count: 67, topService: 'نحت الجسم' },
  { name: 'khobar', count: 54, topService: 'الليزر' },
  { name: 'tabuk', count: 21, topService: 'البوتوكس' },
  { name: 'abha', count: 18, topService: 'العناية بالبشرة' },
]

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-rose-600">💎 كلينك كومبير</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-700">المدن</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">عيادات التجميل في السعودية</h1>
          <p className="text-gray-500">اختاري مدينتك لعرض العيادات والأسعار</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SAUDI_CITIES.map(city => {
            const stats = CITY_STATS.find(s => s.name === city.name)
            return (
              <Link key={city.name} href={`/cities/${city.name}`}
                className="card p-5 text-center group hover:border-rose-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">🏙️</div>
                <h2 className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors text-lg">
                  {city.nameAr}
                </h2>
                <div className="text-rose-500 font-semibold text-lg mt-1">{stats?.count}</div>
                <div className="text-xs text-gray-400">عيادة</div>
                <div className="mt-2 text-xs bg-rose-50 text-rose-600 rounded-full px-3 py-1 inline-block">
                  الأكثر طلباً: {stats?.topService}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
