// app/page.tsx
import Link from 'next/link'

const SALON_SERVICES = [
  { slug: 'hair', name: 'العناية بالشعر', icon: '💇‍♀️', desc: 'قص، صبغ، كيراتين، تمليس', color: 'from-pink-50 to-rose-50', border: 'border-pink-100' },
  { slug: 'skin', name: 'العناية بالبشرة', icon: '✨', desc: 'تنظيف، تقشير، ماسكات', color: 'from-amber-50 to-yellow-50', border: 'border-amber-100' },
  { slug: 'nails', name: 'العناية بالأظافر', icon: '💅', desc: 'مناكير، باديكير، جل', color: 'from-purple-50 to-violet-50', border: 'border-purple-100' },
  { slug: 'makeup', name: 'المكياج', icon: '💄', desc: 'سهرة، عروس، يومي', color: 'from-red-50 to-pink-50', border: 'border-red-100' },
  { slug: 'spa', name: 'السبا والاسترخاء', icon: '🧖‍♀️', desc: 'مساج، حمام مغربي، جاكوزي', color: 'from-teal-50 to-emerald-50', border: 'border-teal-100' },
  { slug: 'eyebrow', name: 'الحواجب والرموش', icon: '👁️', desc: 'ترتيب، صبغ، رموش', color: 'from-indigo-50 to-blue-50', border: 'border-indigo-100' },
]

const SAUDI_CITIES = [
  { name: 'riyadh', nameAr: 'الرياض' },
  { name: 'jeddah', nameAr: 'جدة' },
  { name: 'makkah', nameAr: 'مكة المكرمة' },
  { name: 'madinah', nameAr: 'المدينة المنورة' },
  { name: 'dammam', nameAr: 'الدمام' },
  { name: 'khobar', nameAr: 'الخبر' },
  { name: 'tabuk', nameAr: 'تبوك' },
  { name: 'abha', nameAr: 'أبها' },
]

const FEATURED_SALONS = [
  { name: 'صالون لوز', city: 'الرياض', rating: 4.9, reviews: 234, services: ['شعر', 'بشرة', 'أظافر'], slug: 'louz-salon', price: 'من 80 ريال' },
  { name: 'مشغل الأناقة', city: 'جدة', rating: 4.8, reviews: 189, services: ['مكياج', 'سبا', 'شعر'], slug: 'elegance-salon', price: 'من 120 ريال' },
  { name: 'صالون نور', city: 'الدمام', rating: 4.7, reviews: 156, services: ['أظافر', 'بشرة'], slug: 'noor-salon', price: 'من 60 ريال' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">

      {/* Navbar */}
      <nav className="bg-white border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💅</span>
            <span className="text-xl font-bold text-rose-600">صالوني</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/search" className="hover:text-rose-600 transition-colors">البحث</Link>
            <Link href="/compare" className="hover:text-rose-600 transition-colors">المقارنة</Link>
            <Link href="/cities" className="hover:text-rose-600 transition-colors">المدن</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-rose-600 hidden md:block">دخول</Link>
            <Link href="/register" className="bg-rose-600 hover:bg-rose-700 text-white text-sm py-2 px-4 rounded-full transition-colors font-medium">انضمي مجاناً</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-8xl">💅</div>
          <div className="absolute top-20 left-20 text-6xl">✨</div>
          <div className="absolute bottom-10 right-40 text-7xl">💄</div>
          <div className="absolute bottom-20 left-10 text-5xl">🌸</div>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
            <span>✨</span>
            <span>أكثر من 1000+ صالون في السعودية</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            اكتشفي أفضل
            <span className="text-yellow-300"> صالونات التجميل</span>
            <br />في مدينتك
          </h1>
          <p className="text-xl text-rose-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            قارني الأسعار، اقرئي التقييمات، واحجزي موعدك في أفضل صالون يناسبك
          </p>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-2xl p-3 max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="ابحثي عن خدمة أو صالون..."
              className="flex-1 px-4 py-3 text-right outline-none text-gray-700 placeholder:text-gray-400 text-sm rounded-xl"
            />
            <select className="px-3 py-3 text-sm text-gray-600 outline-none bg-gray-50 rounded-xl border border-gray-100">
              <option>كل المدن</option>
              {SAUDI_CITIES.map(c => (
                <option key={c.name} value={c.name}>{c.nameAr}</option>
              ))}
            </select>
            <Link href="/search" className="bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-xl text-sm whitespace-nowrap transition-colors font-medium">
              🔍 ابحثي
            </Link>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {['شعر', 'أظافر', 'مكياج عروس', 'سبا', 'كيراتين', 'صبغ'].map(s => (
              <Link key={s} href={`/search?q=${s}`}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm transition-all border border-white/30">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-rose-50 border-b border-rose-100 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-4 gap-4 text-center">
          {[
            { num: '+1000', label: 'صالون معتمد', icon: '💅' },
            { num: '+50K', label: 'تقييم حقيقي', icon: '⭐' },
            { num: '+15', label: 'مدينة سعودية', icon: '📍' },
            { num: '100%', label: 'مجاني للعميلة', icon: '🎁' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl mb-1">{s.icon}</span>
              <div className="text-2xl font-bold text-rose-600">{s.num}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">ماذا تبحثين عنه؟</h2>
          <p className="text-gray-500">اختاري الخدمة وابحثي عن أفضل صالون بأفضل سعر</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SALON_SERVICES.map(svc => (
            <Link key={svc.slug} href={`/search?service=${svc.slug}`}
              className={`bg-gradient-to-br ${svc.color} border ${svc.border} rounded-2xl p-6 text-center group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1`}>
              <div className="text-5xl mb-3">{svc.icon}</div>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-rose-600 transition-colors mb-1">
                {svc.name}
              </h3>
              <p className="text-sm text-gray-500">{svc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Salons */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">صالونات مميزة</h2>
              <p className="text-gray-500">الأعلى تقييماً هذا الأسبوع</p>
            </div>
            <Link href="/search" className="text-rose-600 hover:underline text-sm font-medium">عرض الكل ←</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURED_SALONS.map(salon => (
              <Link key={salon.slug} href={`/clinic/${salon.slug}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-3xl">💅</div>
                  <div className="text-left">
                    <div className="text-amber-400 text-sm">{'★'.repeat(Math.round(salon.rating))}</div>
                    <div className="font-bold text-gray-700">{salon.rating}</div>
                    <div className="text-xs text-gray-400">({salon.reviews})</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-rose-600 transition-colors mb-1">{salon.name}</h3>
                <p className="text-sm text-gray-400 mb-3">📍 {salon.city}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {salon.services.map(s => (
                    <span key={s} className="bg-rose-50 text-rose-600 text-xs px-2.5 py-1 rounded-full border border-rose-100">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-600 text-sm">{salon.price}</span>
                  <span className="text-xs text-rose-500 group-hover:underline">عرض التفاصيل ←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">ابحثي في مدينتك</h2>
        <p className="text-gray-500 text-center mb-10">صالونات قريبة منك في كل مكان</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SAUDI_CITIES.map(city => (
            <Link key={city.name} href={`/cities/${city.name}`}
              className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5 text-center group hover:shadow-md hover:border-rose-200 transition-all">
              <div className="text-3xl mb-2">🏙️</div>
              <h3 className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">{city.nameAr}</h3>
              <p className="text-xs text-gray-400 mt-1">صالونات متاحة</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-rose-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل صالوني؟</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🔍', title: 'ابحثي', desc: 'ابحثي عن الخدمة التي تريدينها في مدينتك' },
              { icon: '⚖️', title: 'قارني', desc: 'قارني الأسعار والتقييمات بين أفضل الصالونات' },
              { icon: '📅', title: 'احجزي', desc: 'احجزي موعدك بسهولة في الصالون المفضل' },
            ].map((s, i) => (
              <div key={i}>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-rose-100 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for salons */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">💅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">هل تملكين صالون تجميل؟</h2>
          <p className="text-gray-500 mb-8 text-lg leading-relaxed">
            أضيفي صالونك مجاناً واستقطبي عميلات جدد من خلال منصة صالوني
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">
              أضيفي صالونك مجاناً ←
            </Link>
            <Link href="/search" className="border border-rose-200 text-rose-600 font-bold px-8 py-4 rounded-xl hover:bg-rose-50 transition-colors">
              تصفحي الصالونات
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-rose-400 mb-3">
              <span>💅</span><span>صالوني</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة مقارنة أسعار صالونات التجميل الأولى في المملكة العربية السعودية
            </p>
          </div>
          {[
            { title: 'الخدمات', links: ['العناية بالشعر', 'الأظافر', 'المكياج', 'السبا'] },
            { title: 'الموقع', links: ['البحث', 'المقارنة', 'المدن', 'المدونة'] },
            { title: 'للصالونات', links: ['أضيفي صالونك', 'تسجيل الدخول', 'لوحة التحكم', 'تواصلي معنا'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold mb-3 text-gray-200">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}><Link href="#" className="text-gray-400 hover:text-rose-400 text-sm transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2025 صالوني — جميع الحقوق محفوظة
        </div>
      </footer>
    </main>
  )
}