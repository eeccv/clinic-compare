// app/search/page.tsx
import Link from 'next/link'
import { SERVICE_CATEGORIES, SAUDI_CITIES } from '@/lib/types'

// Mock data for demonstration
const MOCK_CLINICS = [
  {
    id: '1', name: 'عيادة لوز للتجميل', slug: 'louz-clinic',
    city: 'riyadh', cityAr: 'الرياض', verified: true, featured: true,
    avgRating: 4.8, reviewCount: 124,
    services: [{ name: 'البوتوكس', price: 800, priceMax: 1500 }],
    description: 'عيادة متخصصة في أحدث تقنيات التجميل',
  },
  {
    id: '2', name: 'مركز جمال الوردة', slug: 'ward-beauty',
    city: 'jeddah', cityAr: 'جدة', verified: true, featured: false,
    avgRating: 4.5, reviewCount: 89,
    services: [{ name: 'البوتوكس', price: 650, priceMax: 1200 }],
    description: 'خبرة 10 سنوات في عالم التجميل',
  },
  {
    id: '3', name: 'عيادة الأناقة', slug: 'elegance-clinic',
    city: 'riyadh', cityAr: 'الرياض', verified: false, featured: false,
    avgRating: 4.2, reviewCount: 56,
    services: [{ name: 'البوتوكس', price: 550, priceMax: 1000 }],
    description: 'أسعار تنافسية وجودة عالية',
  },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; city?: string; service?: string; sort?: string }
}) {
  const { q, city, service, sort } = searchParams

  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      {/* Navbar */}
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-rose-600">💎 كلينك كومبير</Link>
          <div className="flex items-center gap-3">
            <Link href="/compare" className="text-sm text-gray-600 hover:text-rose-600">المقارنة</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">انضمي</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-50 mb-6 flex gap-3">
          <input
            type="text"
            defaultValue={q}
            placeholder="ابحثي عن خدمة أو عيادة..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-rose-100 text-right outline-none focus:border-rose-300 text-sm"
          />
          <select defaultValue={city} className="px-3 py-2.5 rounded-xl border border-rose-100 text-sm outline-none">
            <option value="">كل المدن</option>
            {SAUDI_CITIES.map(c => <option key={c.name} value={c.name}>{c.nameAr}</option>)}
          </select>
          <button className="btn-primary py-2.5 px-5 text-sm">بحث</button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="card p-5 space-y-6">
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
                  <input type="number" placeholder="من" className="w-full px-3 py-2 border border-rose-100 rounded-lg text-sm text-right outline-none" />
                  <input type="number" placeholder="إلى" className="w-full px-3 py-2 border border-rose-100 rounded-lg text-sm text-right outline-none" />
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
                <span className="text-sm text-gray-700">عيادات موثقة فقط ✓</span>
              </label>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Sort + Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{MOCK_CLINICS.length} نتيجة</p>
              <select className="text-sm border border-rose-100 rounded-lg px-3 py-2 outline-none">
                <option>الأكثر تقييماً</option>
                <option>الأرخص سعراً</option>
                <option>الأقرب إليك</option>
                <option>الأحدث</option>
              </select>
            </div>

            {/* Clinic Cards */}
            <div className="space-y-4">
              {MOCK_CLINICS.map(clinic => (
                <div key={clinic.id} className="card p-5 flex gap-4">
                  {/* Logo */}
                  <div className="w-20 h-20 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🏥</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-800">{clinic.name}</h3>
                          {clinic.verified && <span className="badge-verified">✓ موثقة</span>}
                          {clinic.featured && <span className="badge-featured">⭐ مميزة</span>}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">📍 {clinic.cityAr}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{clinic.description}</p>
                      </div>
                      <div className="text-left flex-shrink-0 mr-4">
                        <div className="text-amber-400 text-sm">{'★'.repeat(Math.round(clinic.avgRating))}</div>
                        <div className="font-bold text-lg text-gray-800">{clinic.avgRating}</div>
                        <div className="text-xs text-gray-400">{clinic.reviewCount} تقييم</div>
                      </div>
                    </div>

                    {/* Services Preview */}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {clinic.services.map(s => (
                        <div key={s.name} className="bg-rose-50 border border-rose-100 rounded-lg px-3 py-1.5 text-sm">
                          <span className="text-gray-600">{s.name}: </span>
                          <span className="font-bold text-rose-600">{s.price.toLocaleString()} ريال</span>
                          {s.priceMax && <span className="text-gray-400"> - {s.priceMax.toLocaleString()}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0 justify-center">
                    <Link href={`/clinic/${clinic.slug}`} className="btn-primary text-sm py-2 px-4 text-center">
                      عرض التفاصيل
                    </Link>
                    <button className="btn-secondary text-sm py-2 px-4">
                      + قارني
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
