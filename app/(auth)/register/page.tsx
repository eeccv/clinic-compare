// app/(auth)/register/page.tsx
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-rose-600">💎 كلينك كومبير</Link>
          <p className="text-gray-500 mt-2 text-sm">أضيفي عيادتك وابدئي استقطاب عملاء جدد</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h1>
          <p className="text-sm text-gray-500 mb-6">مجاني تماماً — لا بطاقة ائتمان مطلوبة</p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم الأول</label>
                <input type="text" placeholder="سارة" className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">اسم العيادة</label>
                <input type="text" placeholder="عيادة النور" className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <input type="email" placeholder="clinic@example.com" className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم الجوال</label>
              <input type="tel" placeholder="+966 5X XXX XXXX" className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">المدينة</label>
              <select className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm bg-white">
                <option value="">اختاري مدينتك</option>
                {['الرياض', 'جدة', 'مكة المكرمة', 'الدمام', 'الخبر', 'تبوك', 'أبها'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">كلمة المرور</label>
              <input type="password" placeholder="8 أحرف على الأقل" className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="accent-rose-500 mt-0.5" />
              <span className="text-xs text-gray-600 leading-relaxed">
                أوافق على{' '}
                <Link href="/terms" className="text-rose-500 hover:underline">شروط الاستخدام</Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-rose-500 hover:underline">سياسة الخصوصية</Link>
              </span>
            </label>

            <button type="submit" className="btn-primary w-full py-3 text-base">
              إنشاء الحساب مجاناً ←
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-5">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-rose-600 font-medium hover:underline">سجلي الدخول</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
