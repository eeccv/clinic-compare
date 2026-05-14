// lib/types.ts

export interface Clinic {
  id: string
  name: string
  slug: string
  description?: string
  city: string
  address?: string
  phone?: string
  whatsapp?: string
  website?: string
  logo?: string
  images: string[]
  verified: boolean
  featured: boolean
  createdAt: Date
  doctors: Doctor[]
  services: ClinicService[]
  reviews: Review[]
  avgRating?: number
  reviewCount?: number
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  experience?: number
  image?: string
  clinicId: string
}

export interface Service {
  id: string
  name: string
  slug: string
  category: string
  description?: string
  image?: string
}

export interface ClinicService {
  id: string
  price: number
  priceMax?: number
  currency: string
  notes?: string
  clinic: Clinic
  service: Service
}

export interface Review {
  id: string
  rating: number
  comment?: string
  author: string
  createdAt: Date
  clinicId: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image?: string
  published: boolean
  createdAt: Date
}

export type City = {
  name: string
  nameAr: string
  count?: number
}

export const SAUDI_CITIES: City[] = [
  { name: 'riyadh', nameAr: 'الرياض' },
  { name: 'jeddah', nameAr: 'جدة' },
  { name: 'makkah', nameAr: 'مكة المكرمة' },
  { name: 'madinah', nameAr: 'المدينة المنورة' },
  { name: 'dammam', nameAr: 'الدمام' },
  { name: 'khobar', nameAr: 'الخبر' },
  { name: 'tabuk', nameAr: 'تبوك' },
  { name: 'abha', nameAr: 'أبها' },
]

export const SERVICE_CATEGORIES = [
  { slug: 'botox', name: 'البوتوكس والفيلر' },
  { slug: 'laser', name: 'الليزر وإزالة الشعر' },
  { slug: 'skin', name: 'العناية بالبشرة' },
  { slug: 'body', name: 'نحت الجسم' },
  { slug: 'hair', name: 'زراعة الشعر' },
  { slug: 'dental', name: 'تجميل الأسنان' },
]
