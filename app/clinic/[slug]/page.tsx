// app/clinic/[slug]/page.tsx
import Link from 'next/link'
import { Metadata } from 'next'

const MOCK_SALON = {
  id: '1',
  name: 'صالون لوز للتجميل',
  slug: 'louz-salon',
  description: 'مشغل نسائي متخصص في خدمات الشعر والعناية بالبشرة والمكياج. نقدم أرقى خدمات التجميل بأيدي متخصصات معتمدات بأعلى معايير الجودة.',
  city: 'الرياض',
  address: 'حي النزهة، شارع الأمير سلطان، الرياض',
  phone: '+966 11 456 7890',
  whatsapp: '+966 50 123 4567',
  verified: true,
  featured: true,
  avgRating: 4.8,
  reviewCount: 124,
  images: [],
  staff: [
    { id: '1', name: 'أ. سارة العمري', specialty: 'تصفيف وصبغ الشعر', experience: 12, image: null },
    { id: '2', name: 'أ. منى الشهري', specialty: 'مكياج وعناية بالبشرة', experience: 8, image: null },
  ],
  services: [
    { name: 'قص وتصفيف الشعر', price: 80, priceMax: 200, notes: 'حسب طول الشعر' },
    { name: 'صبغ الشعر', price: 200, priceMax: 600, notes: 'حسب الطول والنوع' },
    { name: 'كيراتين وفرد', price: 400, priceMax: 900, notes: 'حسب طول الشعر' },
    { name: 'مكياج عرائس', price: 600, priceMax: 1500, notes: 'شامل التسريحة' },
    { name: 'مانيكير وباديكير', price: 80, priceMax: 150, notes: 'جلسة كاملة' },
    { name: 'إزالة الشعر', price: 50, priceMax: 200, notes: 'حسب المنطقة' },
  ],
  reviews: [
    { id: '1', rating: 5, author: 'أم محمد', comment: 'صالون رائع والأخت سارة محترفة جداً. النتيجة فاقت توقعاتي!', createdAt: '2024-12-01' },
    { id: '2', rating: 4, author: 'ريم', comment: 'خدمة ممتازة وأسعار معقولة. سأعود بالتأكيد', createdAt: '2024-11-15' },
    { id: '3', rating: 5, author: 'نورا السعيد', comment: 'أفضل صالون في الرياض! الفريق محترف ومتعاون', createdAt: '2024-11-01' },
  ]
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${MOCK_SALON.name} — أسعار وتقييمات`,
    description: MOCK_SALON.description,
  }
}

export default function SalonPage({ params }: { params: { slug: string } }) {
  const salon = MOCK_SALON
  const ratingDist = [5,4,3,2,1].map(r => ({
    rating: r,
    count: salon.reviews.filter(rev => rev.rating === r).length,
    pct: (salon.reviews.filter(rev => rev.rating === r).length / salon.reviews.length) * 100
  }))

  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      {/* Navbar */}
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-rose-600">💅 صالوني</Link>
          <span className="text-gray-300">/</span>
          <Link href="/search" className="text-sm text-gray-500 hover:text-rose-600">البحث</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-700">{salon.name}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Card */}
        <div className="card p-6 mb-6">
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 bg-rose-50 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
              💇‍♀️
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{salon.name}</h1>
                {salon.verified && <span className="badge-verified">✓ موثق</span>}
                {salon.featured && <span className="badge-featured">⭐ مميز</span>}
              </div>
              <p className="text-gray-500 text-sm mb-3">📍 {salon.address}</p>
              <p className="text-gray-600 leading-relaxed">{salon.description}</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">{'★'.repeat(Math.round(salon.avgRating))}</span>
                  <span className="font-bold">{salon.avgRating}</span>
                  <span className="text-gray-400 text-sm">({salon.reviewCount} تقييم)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`/book/${salon.id}`}
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
                ✂️ الخدمات والأسعار
              </h2>
              <div className="space-y-3">
                {salon.services.map((s, i) => (
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

            {/* Staff */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-5">👩‍🎨 فريق العمل</h2>
              <div className="grid grid-cols-2 gap-4">
                {salon.staff.map(member => (
                  <div key={member.id} className="bg-rose-50 rounded-xl p-4 text-center border border-rose-100">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      👩‍🎨
                    </div>
                    <div className="font-bold text-gray-800">{member.name}</div>
                    <div className="text-sm text-rose-600 mt-1">{member.specialty}</div>
                    {member.experience && (
                      <div className="text-xs text-gray-400 mt-1">{member.experience} سنوات خبرة</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-5">⭐ تقييمات العميلات</h2>
              <div className="flex gap-6 mb-6 p-4 bg-rose-50 rounded-xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800">{salon.avgRating}</div>
                  <div className="text-amber-400 text-xl mt-1">{'★'.repeat(Math.round(salon.avgRating))}</div>
                  <div className="text-sm text-gray-400 mt-1">{salon.reviewCount} تقييم</div>
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
                {salon.reviews.map(rev => (
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
            <div className="card p-5">
              <h3 className="font-bold mb-4">معلومات التواصل</h3>
              <div className="space-y-3 text-sm">
                {salon.phone && (
                  <div className="flex items-center gap-3">
                    <span>📞</span>
                    <a href={`tel:${salon.phone}`} className="text-rose-600 hover:underline">{salon.phone}</a>
                  </div>
                )}
                {salon.whatsapp && (
                  <div className="flex items-center gap-3">
                    <span>💬</span>
                    <a href={`https://wa.me/${salon.whatsapp.replace(/\D/g,'')}`} className="text-green-600 hover:underline">واتساب</a>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span>📍</span>
                  <span className="text-gray-600">{salon.address}</span>
                </div>
              </div>
            </div>

            <div className="card p-5 bg-rose-600 text-white border-0">
              <h3 className="font-bold mb-2">احجزي موعدك الآن</h3>
              <p className="text-rose-100 text-sm mb-4">احجزي مباشرة عبر واتساب بسهولة</p>
              <a href={`/book/${salon.id}`} className="bg-white text-rose-600 font-medium py-2 px-4 rounded-lg text-sm block text-center hover:bg-rose-50 transition-colors">
                📅 احجزي الآن ←
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}