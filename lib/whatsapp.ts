export function buildWhatsAppLink(phone: string, clinicName: string, date: string, time: string): string {
  const message = encodeURIComponent(
    `مرحباً، أريد حجز موعد في ${clinicName}\nالتاريخ: ${date}\nالوقت: ${time}`
  );
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${message}`;
}