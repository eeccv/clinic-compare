// app/search/page.tsx
import Link from 'next/link'
import { SERVICE_CATEGORIES, SAUDI_CITIES } from '@/lib/types'

const MOCK_SALONS = [
  {
    id: '1', name: 'صالون لوز للتجميل', slug: 'louz-salon',
    city: 'riyadh', cityAr: 'الرياض', verified: true, featured: true,
    avgRating: 4.8, reviewCount: 124,
    services: [{ name: 'قص وتصفيف', price: 80, priceMax: 200 }],
    description: 'مشغل نسائي متخصص في خدمات الشعر والمكياج',
  },
  {
    id: '2', name: 'صالون وردة الجمال', slug: 'ward-beauty',
    city: 'jeddah', cityAr: 'جدة', verified: true, featured: false,
    avgRating: 4.5, reviewCount: 89,
    services: [{ name: 'كيراتين وفرد', price: 400, priceMax: 900 }],
    description: 'خبرة 10 سنوات في خدمات التجميل النسائي',
  },
  {
    id: '3', name: 'صالون الأناقة', slug: 'elegance-salon',
    city: 'riyadh', cityAr: 'الرياض', verified: false, featured: false,
    avgRating: 4.2, reviewCount: 56,
    services: [{ name: 'مكياج عرائس', price: 600, priceMax: 1500 }],
    description: 'أسعار تنافسية وجودة عالية في التجميل',
  },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; city?: string; service?: string; sort?: string }
}) {
  const { q, city } = searchParams

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-rose-600">صالوني</Link>
          <div className="flex items-center gap-3">
            <Link href="/compare" className="text-sm text-gray-600 hover:text-rose-600 hidden sm:block">المقارنة</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-3">انضمي</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 py-4">
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-rose-50 mb-4 flex gap-2">
          <input
            type="text"
            defaultValue={q}
            placeholder="ابحثي عن خدمة أو صالون..."
            className="flex-1 px-3 py-2 rounded-xl border border-rose-100 text-right outline-none focus:border-rose-300 text-sm"
          />
          <select defaultValue={city} className="px-2 py-2 rounded-xl border border-rose-100 text-sm outline-none">
            <option value="">كل المدن</option>
            {SAUDI_CITIES.map(c => <option key={c.name} value={c.name}>{c.nameAr}</option>)}
          </select>
          <button className="btn-primary py-2 px-4 text-sm">بحث</button>
        </div>

        <div className="flex gap-4">
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <div className="card p-4 space-y-5">
              <div>
                <h3 className="font-bold mb-3 text-sm text-gray-700">نوع الخدمة</h3>
                <div className="space-y-2">
                  {SERVICE_CATEGORIES.map(cat => (
                    <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-rose-500" />
                      <span className="text-sm text-gray-600 group-hover:text-rose-600">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 text-sm text-gray-700">المدينة</h3>
                <div className="space-y-2">
                  {SAUDI_CITIES.slice(0, 5).map(c => (
                    <label key={c.name} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-rose-500" />
                      <span className="text-sm text-gray-600 group-hover:text-rose-600">{c.nameAr}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 text-sm text-gray-700">نطاق السعر (ريال)</h3>
                <div className="flex gap-2">
                  <input type="number" placeholder="من" className="w-full px-2 py-2 border border-rose-100 rounded-lg text-sm text-right outline-none" />
                  <input type="number" placeholder="إلى" className="w-full px-2 py-2 border border-rose-100 rounded-lg text-sm text-right outline-none" />
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 text-sm text-gray-700">التقييم</h3>
                {[5,4,3].map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer mb-2">
                    <input type="radio" name="rating" className="accent-rose-500" />
                    <span className="text-amber-400 text-sm">{'★'.repeat(r)}{'☆'.repeat(5-r)}</span>
                    <span className="text-sm text-gray-500">فأكثر</span>
                  </label>
                ))}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-rose-500" />
                <span className="text-sm text-gray-700">موثقة فقط</span>
              </label>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">{MOCK_SALONS.length} نتيجة</p>
              <select className="text-sm border border-rose-100 rounded-lg px-2 py-1.5 outline-none">
                <option>الأكثر تقييماً</option>
                <option>الأرخص سعراً</option>
                <option>الأحدث</option>
              </select>
            </div>

            <div className="space-y-3">
              {MOCK_SALONS.map(salon => (
                <Link key={salon.id} href={`/book/${salon.id}`}
                  className="card p-4 flex gap-3 hover:border-rose-200 hover:shadow-md transition-all cursor-pointer block">

                  <div className="w-16 h-16 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl font-bold text-rose-300">
                    {salon.name[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <h3 className="font-bold text-gray-800 text-base">{salon.name}</h3>
                          {salon.verified && (
                            <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-1.5 py-0.5 rounded-full">موثق</span>
                          )}
                          {salon.featured && (
                            <span className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-1.5 py-0.5 rounded-full">مميز</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{salon.cityAr}</p>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{salon.description}</p>
                      </div>

                      <div className="text-center flex-shrink-0">
                        <div className="text-amber-400 text-xs">{'★'.repeat(Math.round(salon.avgRating))}</div>
                        <div className="font-bold text-gray-800">{salon.avgRating}</div>
                        <div className="text-xs text-gray-400">{salon.reviewCount}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {salon.services.map(s => (
                        <div key={s.name} className="bg-rose-50 border border-rose-100 rounded-lg px-2 py-1 text-xs">
                          <span className="text-gray-600">{s.name}: </span>
                          <span className="font-bold text-rose-600">{s.price.toLocaleString()} ريال</span>
                          {s.priceMax && <span className="text-gray-400"> - {s.priceMax.toLocaleString()}</span>}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2">
                      <span className="text-xs text-rose-500 font-medium">اضغطي للحجز</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}