// app/(dashboard)/dashboard/page.tsx
import Link from 'next/link'

const STATS = [
  { label: 'إجمالي المشاهدات', value: '2,847', icon: '👁️', change: '+12%', up: true },
  { label: 'التقييمات الجديدة', value: '23', icon: '⭐', change: '+5%', up: true },
  { label: 'طلبات التواصل', value: '156', icon: '📞', change: '-3%', up: false },
  { label: 'معدل التحويل', value: '8.4%', icon: '📈', change: '+2%', up: true },
]

const RECENT_REVIEWS = [
  { id: '1', author: 'أم محمد', rating: 5, comment: 'خدمة ممتازة وطاقم محترف', date: '2024-12-10' },
  { id: '2', author: 'ريم العتيبي', rating: 4, comment: 'تجربة جيدة بشكل عام', date: '2024-12-08' },
  { id: '3', author: 'نورا', rating: 5, comment: 'أفضل عيادة في الرياض!', date: '2024-12-05' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">💎 كلينك كومبير</Link>
          <nav className="space-y-1">
            {[
              { icon: '🏠', label: 'الرئيسية', href: '/dashboard', active: true },
              { icon: '🏥', label: 'عيادتي', href: '/dashboard/clinic' },
              { icon: '💉', label: 'الخدمات والأسعار', href: '/dashboard/services' },
              { icon: '⭐', label: 'التقييمات', href: '/dashboard/reviews' },
              { icon: '📊', label: 'الإحصائيات', href: '/dashboard/analytics' },
              { icon: '⚙️', label: 'الإعدادات', href: '/dashboard/settings' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-6 right-5 left-5">
            <div className="bg-rose-50 rounded-xl p-4 text-center">
              <p className="text-xs text-rose-600 font-medium mb-2">ترقية للحساب المميز</p>
              <button className="btn-primary text-xs py-2 px-4 w-full">ترقية الآن</button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 mr-64 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">مرحباً، عيادة لوز 👋</h1>
              <p className="text-gray-500 text-sm mt-1">إليك ملخص أداء عيادتك اليوم</p>
            </div>
            <Link href="/dashboard/clinic" className="btn-primary text-sm">تعديل الملف الشخصي</Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {STATS.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                  }`}>{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Recent Reviews */}
            <div className="col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-800">أحدث التقييمات</h2>
                <Link href="/dashboard/reviews" className="text-sm text-rose-500 hover:underline">عرض الكل</Link>
              </div>
              <div className="space-y-4">
                {RECENT_REVIEWS.map(rev => (
                  <div key={rev.id} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0">
                    <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center text-sm font-bold text-rose-600 flex-shrink-0">
                      {rev.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{rev.author}</span>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                      <div className="text-amber-400 text-xs mt-0.5">{'★'.repeat(rev.rating)}</div>
                      <p className="text-sm text-gray-600 mt-1">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
                <div className="space-y-2">
                  {[
                    { label: 'إضافة خدمة جديدة', icon: '➕', href: '/dashboard/services/new' },
                    { label: 'تحديث الأسعار', icon: '💰', href: '/dashboard/services' },
                    { label: 'رد على التقييمات', icon: '💬', href: '/dashboard/reviews' },
                    { label: 'تحديث الصور', icon: '📸', href: '/dashboard/clinic' },
                  ].map(action => (
                    <Link key={action.href} href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 transition-colors text-sm text-gray-700 hover:text-rose-600">
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-rose-600 rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-2">🚀 حسابك المميز</h3>
                <p className="text-rose-100 text-xs leading-relaxed mb-3">ظهوري في أعلى نتائج البحث واحصلي على شارة التوثيق</p>
                <button className="bg-white text-rose-600 text-xs font-bold py-2 px-4 rounded-lg w-full">
                  ترقية الآن
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
