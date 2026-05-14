// app/(auth)/login/page.tsx
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-rose-600">💎 كلينك كومبير</Link>
          <p className="text-gray-500 mt-2 text-sm">تسجيل الدخول لإدارة عيادتك</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-6">تسجيل الدخول</h1>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-rose-500" />
                <span className="text-gray-600">تذكرني</span>
              </label>
              <Link href="/forgot-password" className="text-rose-500 hover:underline">نسيت كلمة المرور؟</Link>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-base">
              تسجيل الدخول
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rose-100" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">أو</div>
          </div>

          <p className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-rose-600 font-medium hover:underline">سجلي مجاناً</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
