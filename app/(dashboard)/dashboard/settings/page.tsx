'use client'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { label: 'الرئيسية', href: '/dashboard' },
  { label: 'صالوني', href: '/salon-dashboard' },
  { label: 'الخدمات والأسعار', href: '/salon-dashboard' },
  { label: 'الحجوزات', href: '/dashboard/bookings' },
  { label: 'التقييمات', href: '/dashboard/reviews' },
  { label: 'الإحصائيات', href: '/dashboard/analytics' },
  { label: 'الإعدادات', href: '/dashboard/settings', active: true },
]

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: 'Admin',
    email: 'admin@salon.com',
    phone: '0501234567',
    currentPassword: '',
    newPassword: '',
    notifications: true,
    bookingAlerts: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="flex">
        <aside className="w-64 bg-white border-l border-gray-100 min-h-screen p-5 fixed">
          <Link href="/" className="text-xl font-bold text-rose-600 block mb-8">صالوني</Link>
          <nav className="space-y-1">
            {NAV.map(item => (
              <Link key={item.label} href={item.href}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 mr-64 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">الإعدادات</h1>

          <div className="space-y-6 max-w-2xl">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">المعلومات الشخصية</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">الاسم</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">البريد الإلكتروني</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">رقم الهاتف</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">تغيير كلمة المرور</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">كلمة المرور الحالية</label>
                  <input type="password" value={form.currentPassword}
                    onChange={e => setForm({...form, currentPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">كلمة المرور الجديدة</label>
                  <input type="password" value={form.newPassword}
                    onChange={e => setForm({...form, newPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-rose-400 text-right text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">الإشعارات</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700">إشعارات الحجوزات الجديدة</span>
                  <input type="checkbox" checked={form.bookingAlerts}
                    onChange={e => setForm({...form, bookingAlerts: e.target.checked})}
                    className="accent-rose-500 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700">إشعارات التقييمات</span>
                  <input type="checkbox" checked={form.notifications}
                    onChange={e => setForm({...form, notifications: e.target.checked})}
                    className="accent-rose-500 w-4 h-4" />
                </label>
              </div>
            </div>

            <button onClick={handleSave}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl transition-colors">
              {saved ? 'تم الحفظ' : 'حفظ التعديلات'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}