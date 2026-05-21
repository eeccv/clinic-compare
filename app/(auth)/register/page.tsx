'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'USER'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'حدث خطأ')
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-rose-600">💅 صالوني</Link>
          <p className="text-gray-500 mt-2 text-sm">أضيفي صالونك وابدئي استقطاب عميلات جدد</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-2">إنشاء حساب جديد</h1>

          {success ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-green-600 font-bold text-lg">تم إنشاء الحساب بنجاح!</p>
              <p className="text-gray-500 text-sm mt-2">جاري تحويلك لصفحة تسجيل الدخول...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم</label>
                <input type="text" placeholder="اسمك الكريم"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
                <input type="email" placeholder="example@email.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نوع الحساب</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                  className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm bg-white">
                  <option value="USER">عميلة</option>
                  <option value="CLINIC_OWNER">صاحبة صالون</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">كلمة المرور</label>
                <input type="password" placeholder="8 أحرف على الأقل"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full px-4 py-3 border border-rose-100 rounded-xl text-right outline-none focus:border-rose-300 text-sm" />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-3 text-base disabled:opacity-50">
                {loading ? '⏳ جاري الإنشاء...' : 'إنشاء الحساب ←'}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-5">
            لديك حساب؟{' '}
            <Link href="/login" className="text-rose-600 font-medium hover:underline">سجلي الدخول</Link>
          </p>
        </div>
      </div>
    </main>
  )
}