// app/compare/page.tsx
import Link from 'next/link'

const MOCK_COMPARE = [
  {
    id: '1', name: 'عيادة لوز للتجميل', slug: 'louz-clinic',
    city: 'الرياض', verified: true, avgRating: 4.8, reviewCount: 124,
    services: [
      { name: 'البوتوكس', price: 800 },
      { name: 'الفيلر', price: 1200 },
      { name: 'الليزر', price: 1500 },
      { name: 'العناية بالبشرة', price: 400 },
    ],
    features: { parking: true, femaleDoc: true, payment: true, online: true },
  },
  {
    id: '2', name: 'مركز جمال الوردة', slug: 'ward-beauty',
    city: 'جدة', verified: true, avgRating: 4.5, reviewCount: 89,
    services: [
      { name: 'البوتوكس', price: 650 },
      { name: 'الفيلر', price: 1000 },
      { name: 'الليزر', price: 1800 },
      { name: 'العناية بالبشرة', price: 350 },
    ],
    features: { parking: true, femaleDoc: true, payment: false, online: false },
  },
  {
    id: '3', name: 'عيادة الأناقة', slug: 'elegance-clinic',
    city: 'الرياض', verified: false, avgRating: 4.2, reviewCount: 56,
    services: [
      { name: 'البوتوكس', price: 550 },
      { name: 'الفيلر', price: 900 },
      { name: 'الليزر', price: 1200 },
      { name: 'العناية بالبشرة', price: 300 },
    ],
    features: { parking: false, femaleDoc: true, payment: true, online: false },
  },
]

const SERVICES = ['البوتوكس', 'الفيلر', 'الليزر', 'العناية بالبشرة']
const FEATURES = [
  { key: 'parking', label: 'موقف سيارات' },
  { key: 'femaleDoc', label: 'طبيبات متخصصات' },
  { key: 'payment', label: 'دفع بالتقسيط' },
  { key: 'online', label: 'حجز أونلاين' },
]

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-rose-600">💎 كلينك كومبير</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-700">مقارنة العيادات</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">⚖️ قارني العيادات</h1>
          <p className="text-gray-500">مقارنة شاملة بين الأسعار والخدمات والمميزات</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <td className="w-40 p-3" />
                {MOCK_COMPARE.map(clinic => (
                  <td key={clinic.id} className="p-3 text-center min-w-52">
                    <div className="card p-4">
                      <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">🏥</div>
                      <div className="font-bold text-gray-800 text-sm mb-1">{clinic.name}</div>
                      {clinic.verified && <span className="badge-verified text-xs mb-2 inline-block">✓ موثقة</span>}
                      <div className="text-amber-400 text-sm">{'★'.repeat(Math.round(clinic.avgRating))}</div>
                      <div className="text-sm font-bold">{clinic.avgRating} <span className="text-gray-400 font-normal text-xs">({clinic.reviewCount})</span></div>
                      <div className="text-xs text-gray-400 mt-1">📍 {clinic.city}</div>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Prices Section */}
              <tr>
                <td colSpan={MOCK_COMPARE.length + 1} className="px-3 pt-6 pb-2">
                  <div className="font-bold text-gray-600 text-sm uppercase tracking-wider">الأسعار</div>
                </td>
              </tr>
              {SERVICES.map(svc => (
                <tr key={svc} className="border-b border-rose-50">
                  <td className="px-3 py-3 text-sm text-gray-700 font-medium">{svc}</td>
                  {MOCK_COMPARE.map(clinic => {
                    const s = clinic.services.find(x => x.name === svc)
                    const prices = MOCK_COMPARE.map(c => c.services.find(x => x.name === svc)?.price ?? Infinity)
                    const minPrice = Math.min(...prices)
                    const isCheapest = s?.price === minPrice
                    return (
                      <td key={clinic.id} className="px-3 py-3 text-center">
                        {s ? (
                          <div className={`inline-block px-3 py-1.5 rounded-lg text-sm font-bold ${
                            isCheapest
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-600'
                          }`}>
                            {s.price.toLocaleString()} ر.س
                            {isCheapest && <span className="block text-xs font-normal text-emerald-500">الأرخص 🏆</span>}
                          </div>
                        ) : (
                          <span className="text-gray-300 text-sm">غير متاح</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}

              {/* Features Section */}
              <tr>
                <td colSpan={MOCK_COMPARE.length + 1} className="px-3 pt-6 pb-2">
                  <div className="font-bold text-gray-600 text-sm uppercase tracking-wider">المميزات</div>
                </td>
              </tr>
              {FEATURES.map(feat => (
                <tr key={feat.key} className="border-b border-rose-50">
                  <td className="px-3 py-3 text-sm text-gray-700">{feat.label}</td>
                  {MOCK_COMPARE.map(clinic => (
                    <td key={clinic.id} className="px-3 py-3 text-center">
                      {(clinic.features as any)[feat.key]
                        ? <span className="text-emerald-500 text-lg">✓</span>
                        : <span className="text-gray-300 text-lg">✗</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}

              {/* Actions */}
              <tr>
                <td className="p-3" />
                {MOCK_COMPARE.map(clinic => (
                  <td key={clinic.id} className="p-3 text-center">
                    <Link href={`/clinic/${clinic.slug}`}
                      className="btn-primary text-sm py-2 px-4 block text-center mb-2">
                      عرض التفاصيل
                    </Link>
                    <a href="#" className="text-sm text-rose-500 hover:underline block">إزالة من المقارنة</a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <Link href="/search" className="btn-secondary">+ إضافة عيادة للمقارنة</Link>
        </div>
      </div>
    </main>
  )
}
