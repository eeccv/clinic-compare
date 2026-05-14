// app/page.tsx
import Link from 'next/link'

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

const SERVICE_CATEGORIES = [
  { slug: 'botox', name: 'البوتوكس والفيلر' },
  { slug: 'laser', name: 'الليزر وإزالة الشعر' },
  { slug: 'skin', name: 'العناية بالبشرة' },
  { slug: 'body', name: 'نحت الجسم' },
  { slug: 'hair', name: 'زراعة الشعر' },
  { slug: 'dental', name: 'تجميل الأسنان' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-rose-600">
            💎 كلينك كومبير
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/search" className="hover:text-rose-600 transition-colors">البحث</Link>
            <Link href="/compare" className="hover:text-rose-600 transition-colors">المقارنة</Link>
            <Link href="/cities" className="hover:text-rose-600 transition-colors">المدن</Link>
            <Link href="/blog" className="hover:text-rose-600 transition-colors">المدونة</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-rose-600">تسجيل الدخول</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">انضم مجاناً</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-cream pt-20 pb-28">
        <div className="absolute inset-0 opacity-30"
          style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #f9a8d4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fde68a 0%, transparent 40%)'}}
        />
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white border border-rose-200 rounded-full px-4 py-2 text-sm text-rose-700 mb-6 shadow-sm">
            <span>✨</span>
            <span>أكثر من 500+ عيادة في السعودية</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
            قارني أسعار عيادات
            <span className="text-rose-600"> التجميل</span>
            <br />وأجدي أفضل صفقة
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            ابحثي عن خدمات التجميل في مدينتك، قارني الأسعار، واقرئي آراء العملاء الحقيقيين
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-rose-100 p-2 max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="ابحثي عن خدمة أو عيادة..."
              className="flex-1 px-4 py-3 text-right outline-none text-gray-700 placeholder:text-gray-400 text-sm"
            />
            <select className="px-3 py-3 text-sm text-gray-600 outline-none border-r border-rose-100 bg-transparent">
              <option>كل المدن</option>
              {SAUDI_CITIES.map(c => (
                <option key={c.name} value={c.name}>{c.nameAr}</option>
              ))}
            </select>
            <Link href="/search" className="btn-primary py-3 px-6 rounded-xl text-sm whitespace-nowrap">
              🔍 ابحثي
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['البوتوكس', 'الفيلر', 'الليزر', 'تبييض الأسنان', 'نحت الجسم'].map(s => (
              <Link key={s} href={`/search?q=${s}`}
                className="bg-white/80 hover:bg-white border border-rose-100 rounded-full px-4 py-1.5 text-sm text-gray-600 hover:text-rose-600 transition-all">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-rose-600 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '+500', label: 'عيادة معتمدة' },
            { num: '+50', label: 'خدمة تجميلية' },
            { num: '+10K', label: 'تقييم حقيقي' },
            { num: '+15', label: 'مدينة سعودية' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold mb-1">{s.num}</div>
              <div className="text-rose-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="text-3xl font-bold text-center mb-3">تصفحي حسب الخدمة</h2>
        <p className="text-gray-500 text-center mb-10">اختاري الخدمة التي تهمك وقارني الأسعار</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <Link key={cat.slug} href={`/service/${cat.slug}`}
              className="card p-6 text-center group cursor-pointer hover:border-rose-200">
              <div className="text-4xl mb-3">
                {['💉', '✨', '🌸', '💪', '💆', '🦷'][i]}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">قارني الأسعار</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">العيادات حسب المدينة</h2>
          <p className="text-gray-500 text-center mb-10">ابحثي عن عيادات في مدينتك</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SAUDI_CITIES.map(city => (
              <Link key={city.name} href={`/cities/${city.name}`}
                className="relative overflow-hidden rounded-2xl p-6 text-center group cursor-pointer
                  bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100
                  hover:from-rose-100 hover:to-pink-100 transition-all hover:shadow-md">
                <div className="text-2xl mb-2">🏙️</div>
                <h3 className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">
                  {city.nameAr}
                </h3>
                <p className="text-xs text-gray-400 mt-1">عيادات متاحة</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل الموقع؟</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🔍', title: 'ابحثي', desc: 'ابحثي عن الخدمة التي تريدينها في مدينتك' },
            { icon: '⚖️', title: 'قارني', desc: 'قارني الأسعار والتقييمات بين أفضل العيادات' },
            { icon: '💎', title: 'احجزي', desc: 'احجزي موعدك في العيادة المناسبة بأفضل سعر' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA for clinics */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">هل تملكين عيادة تجميل؟</h2>
          <p className="text-rose-100 mb-8 text-lg">
            أضيفي عيادتك مجاناً واستقطبي عملاء جدد من خلال منصتنا
          </p>
          <Link href="/register" className="bg-white text-rose-600 font-bold px-8 py-4 rounded-xl hover:bg-rose-50 transition-colors inline-block">
            أضيفي عيادتك مجاناً ←
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-rose-400 mb-3">💎 كلينك كومبير</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة مقارنة أسعار عيادات التجميل الأولى في المملكة العربية السعودية
            </p>
          </div>
          {[
            { title: 'الموقع', links: ['البحث', 'المقارنة', 'المدن', 'المدونة'] },
            { title: 'الخدمات', links: ['البوتوكس', 'الليزر', 'العناية بالبشرة', 'نحت الجسم'] },
            { title: 'للعيادات', links: ['أضف عيادتك', 'تسجيل الدخول', 'لوحة التحكم', 'تواصل معنا'] },
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
          © 2025 كلينك كومبير — جميع الحقوق محفوظة
        </div>
      </footer>
    </main>
  )
}
