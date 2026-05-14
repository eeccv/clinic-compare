// app/clinic/[slug]/page.tsx
import Link from 'next/link'
import { Metadata } from 'next'

const MOCK_CLINIC = {
  id: '1',
  name: 'عيادة لوز للتجميل',
  slug: 'louz-clinic',
  description: 'عيادة متخصصة في أحدث تقنيات التجميل تحت إشراف أطباء معتمدين. نقدم خدمات متكاملة في مجال التجميل الطبي والجراحي بأعلى معايير الجودة والسلامة.',
  city: 'الرياض',
  address: 'حي النزهة، شارع الأمير سلطان، الرياض',
  phone: '+966 11 456 7890',
  whatsapp: '+966 50 123 4567',
  verified: true,
  featured: true,
  avgRating: 4.8,
  reviewCount: 124,
  images: [],
  doctors: [
    { id: '1', name: 'د. سارة العمري', specialty: 'جراحة التجميل', experience: 12, image: null },
    { id: '2', name: 'د. منى الشهري', specialty: 'الأمراض الجلدية', experience: 8, image: null },
  ],
  services: [
    { name: 'البوتوكس', price: 800, priceMax: 1500, notes: 'حسب المنطقة المعالجة' },
    { name: 'الفيلر', price: 1200, priceMax: 2500, notes: 'سيرينج واحد' },
    { name: 'تقشير الجلد بالليزر', price: 1500, priceMax: 3000, notes: 'جلسة كاملة' },
    { name: 'علاج حب الشباب', price: 400, priceMax: 800, notes: 'جلسة' },
  ],
  reviews: [
    { id: '1', rating: 5, author: 'أم محمد', comment: 'عيادة رائعة والدكتورة محترفة جداً. النتيجة فاقت توقعاتي!', createdAt: '2024-12-01' },
    { id: '2', rating: 4, author: 'ريم', comment: 'خدمة ممتازة وأسعار معقولة. سأعود بالتأكيد', createdAt: '2024-11-15' },
    { id: '3', rating: 5, author: 'نورا السعيد', comment: 'أفضل عيادة في الرياض! الفريق الطبي محترف ومتعاون', createdAt: '2024-11-01' },
  ]
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${MOCK_CLINIC.name} — أسعار وتقييمات`,
    description: MOCK_CLINIC.description,
  }
}

export default function ClinicPage({ params }: { params: { slug: string } }) {
  const clinic = MOCK_CLINIC
  const ratingDist = [5,4,3,2,1].map(r => ({
    rating: r,
    count: clinic.reviews.filter(rev => rev.rating === r).length,
    pct: (clinic.reviews.filter(rev => rev.rating === r).length / clinic.reviews.length) * 100
  }))

  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      {/* Navbar */}
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-rose-600">💎 كلينك كومبير</Link>
          <span className="text-gray-300">/</span>
          <Link href="/search" className="text-sm text-gray-500 hover:text-rose-600">البحث</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-700">{clinic.name}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Card */}
        <div className="card p-6 mb-6">
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 bg-rose-50 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
              🏥
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{clinic.name}</h1>
                {clinic.verified && <span className="badge-verified">✓ موثقة</span>}
                {clinic.featured && <span className="badge-featured">⭐ مميزة</span>}
              </div>
              <p className="text-gray-500 text-sm mb-3">📍 {clinic.address}</p>
              <p className="text-gray-600 leading-relaxed">{clinic.description}</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">{'★'.repeat(Math.round(clinic.avgRating))}</span>
                  <span className="font-bold">{clinic.avgRating}</span>
                  <span className="text-gray-400 text-sm">({clinic.reviewCount} تقييم)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`/book/${clinic.id}`}
                className="bg-rose-600 hover:bg-rose-700 text-white text-sm py-2 px-5 rounded-xl text-center transition-colors">
                📅 احجزي
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Services & Prices */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                💉 الخدمات والأسعار
              </h2>
              <div className="space-y-3">
                {clinic.services.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <div>
                      <div className="font-semibold text-gray-800">{s.name}</div>
                      {s.notes && <div className="text-xs text-gray-400 mt-0.5">{s.notes}</div>}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-rose-600 text-lg">
                        {s.price.toLocaleString()} ريال
                      </div>
                      {s.priceMax && (
                        <div className="text-xs text-gray-400">حتى {s.priceMax.toLocaleString()} ريال</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-5">👩‍⚕️ الفريق الطبي</h2>
              <div className="grid grid-cols-2 gap-4">
                {clinic.doctors.map(doc => (
                  <div key={doc.id} className="bg-rose-50 rounded-xl p-4 text-center border border-rose-100">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      👩‍⚕️
                    </div>
                    <div className="font-bold text-gray-800">{doc.name}</div>
                    <div className="text-sm text-rose-600 mt-1">{doc.specialty}</div>
                    {doc.experience && (
                      <div className="text-xs text-gray-400 mt-1">{doc.experience} سنوات خبرة</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-5">⭐ تقييمات العملاء</h2>
              <div className="flex gap-6 mb-6 p-4 bg-rose-50 rounded-xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800">{clinic.avgRating}</div>
                  <div className="text-amber-400 text-xl mt-1">{'★'.repeat(Math.round(clinic.avgRating))}</div>
                  <div className="text-sm text-gray-400 mt-1">{clinic.reviewCount} تقييم</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {ratingDist.map(r => (
                    <div key={r.rating} className="flex items-center gap-2 text-sm">
                      <span className="text-amber-400 w-8">{'★'.repeat(r.rating)}</span>
                      <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{width: `${r.pct}%`}} />
                      </div>
                      <span className="text-gray-400 w-6">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {clinic.reviews.map(rev => (
                  <div key={rev.id} className="border-b border-rose-50 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-sm">
                          {rev.author[0]}
                        </div>
                        <span className="font-medium text-sm">{rev.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 text-sm">{'★'.repeat(rev.rating)}</span>
                        <span className="text-xs text-gray-400">{rev.createdAt}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="card p-5">
              <h3 className="font-bold mb-4">معلومات التواصل</h3>
              <div className="space-y-3 text-sm">
                {clinic.phone && (
                  <div className="flex items-center gap-3">
                    <span>📞</span>
                    <a href={`tel:${clinic.phone}`} className="text-rose-600 hover:underline">{clinic.phone}</a>
                  </div>
                )}
                {clinic.whatsapp && (
                  <div className="flex items-center gap-3">
                    <span>💬</span>
                    <a href={`https://wa.me/${clinic.whatsapp.replace(/\D/g,'')}`} className="text-green-600 hover:underline">واتساب</a>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span>📍</span>
                  <span className="text-gray-600">{clinic.address}</span>
                </div>
              </div>
            </div>

            {/* Book CTA */}
            <div className="card p-5 bg-rose-600 text-white border-0">
              <h3 className="font-bold mb-2">احجزي موعدك الآن</h3>
              <p className="text-rose-100 text-sm mb-4">احجزي مباشرة عبر واتساب بسهولة</p>
              <a href={`/book/${clinic.id}`} className="bg-white text-rose-600 font-medium py-2 px-4 rounded-lg text-sm block text-center hover:bg-rose-50 transition-colors">
                📅 احجزي الآن ←
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}