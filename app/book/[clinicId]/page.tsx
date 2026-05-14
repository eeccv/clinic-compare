import { buildWhatsAppLink } from "@/lib/whatsapp"

interface Props {
  params: { clinicId: string }
}

const clinics: Record<string, { name: string; phone: string }> = {
  "1": { name: "عيادة النور", phone: "966501234567" },
  "2": { name: "مركز الشفاء", phone: "966507654321" },
}

export default function BookPage({ params }: Props) {
  const clinic = clinics[params.clinicId]
  if (!clinic) {
    return <div>العيادة غير موجودة</div>
  }
  const link = buildWhatsAppLink(clinic.phone, clinic.name, "2025-01-15", "10:00 صباحاً")
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">حجز موعد</h1>
        <p className="text-gray-600 mb-6">{clinic.name}</p>
        <a href={link} target="_blank" rel="noopener noreferrer"
          className="bg-green-500 text-white px-6 py-3 rounded-xl inline-block hover:bg-green-600 transition">
          احجز عبر واتساب
        </a>
      </div>
    </div>
  )
}
