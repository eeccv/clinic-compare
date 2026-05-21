'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditSalonPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', slug: '', city: '', address: '',
    phone: '', whatsapp: '', description: '',
    verified: false, featured: false,
  })

  useEffect(() => {
    fetch(`/api/salons/${params.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.salon) setForm(data.salon)
      })
      .finally(() => setFetching(false))
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.city) {
      setError('الاسم والمدينة مطلوبان')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/salons/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('فشل الحفظ')
      router.push('/dashboard/salons')
    } catch {
      setError('حدث خطأ أثناء الحفظ')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="min-h-screen flex items-center justify-center">⏳ جاري التحميل...</div>

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">💅 صالوني</Link>
          <nav className="space-y-1">
            {[
              { icon: '🏠', label: 'الرئيسية', href: '/dashboard' },
              { icon: '💇‍♀️', label: 'إدارة الصالونات', href: '/dashboard/salons', active: true },
              { icon: '📅', label: 'الحجوزات', href: '/dashboard/bookings' },
              { icon: '⭐', label: 'التقييمات', href: '/dashboard/reviews' },
              { icon: '⚙️', label: 'الإعدادات', href: '/dashboard/settings' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 mr-64 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/dashboard/salons" className="text-gray-400 hover:text-gray-600">← رجوع</Link>
            <h1 className="text-2xl font-bold text-gray-800">✏️ تعديل الصالون</h1>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-2xl">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">اسم الصالون *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">المدينة *</label>
                  <select name="city" value={form.city} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-sm">
                    <option value="">اختاري المدينة</option>
                    <option value="riyadh">الرياض</option>
                    <option value="jeddah">جدة</option>
                    <option value="mecca">مكة المكرمة</option>
                    <option value="medina">المدينة المنورة</option>
                    <option value="dammam">الدمام</option>
                    <option value="khobar">الخبر</option>
                    <option value="tabuk">تبوك</option>
                    <option value="abha">أبها</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">العنوان</label>
                <input name="address" value={form.address} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">رقم الهاتف</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">رقم واتساب</label>
                  <input name="whatsapp" value={form.whatsapp} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">وصف الصالون</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm resize-none" />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="verified" checked={form.verified}
                    onChange={handleChange} className="accent-rose-500 w-4 h-4" />
                  <span className="text-sm text-gray-700">✓ موثق</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="featured" checked={form.featured}
                    onChange={handleChange} className="accent-rose-500 w-4 h-4" />
                  <span className="text-sm text-gray-700">⭐ مميز</span>
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Link href="/dashboard/salons"
                  className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl text-center">
                  إلغاء
                </Link>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-200 text-white font-medium py-3 rounded-xl transition-colors">
                  {loading ? '⏳ جاري الحفظ...' : '💾 حفظ التعديلات'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}