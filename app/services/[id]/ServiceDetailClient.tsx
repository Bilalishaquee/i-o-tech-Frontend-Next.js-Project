'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import { mockServices } from '@/lib/mockData';
import { ChevronRight, Check } from 'lucide-react';

export default function ServiceDetailClient({ id }: { id: string }) {
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();

  const service = mockServices.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#4b2e05] mb-4">Service Not Found</h1>
          <Link href="/" className="text-yellow-600 hover:text-yellow-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    {
      en: 'Comprehensive legal analysis and consultation',
      ar: 'تحليل قانوني شامل واستشارات',
    },
    {
      en: 'Expert guidance from experienced lawyers',
      ar: 'إرشادات الخبراء من المحامين ذوي الخبرة',
    },
    {
      en: 'Customized solutions for your needs',
      ar: 'حلول مخصصة لاحتياجاتك',
    },
    {
      en: 'Confidential and professional service',
      ar: 'خدمة سرية ومهنية',
    },
    {
      en: 'Support throughout the entire process',
      ar: 'الدعم طوال العملية بأكملها',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative h-96 w-full">
        <Image
          src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt={currentLanguage === 'ar' ? service.titleAr : service.title}
          fill
          className="object-cover"
          style={{ filter: 'grayscale(50%) sepia(30%) hue-rotate(15deg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm mb-4">
              <Link href="/" className="hover:text-yellow-500 transition-colors">
                {t('nav.home')}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-yellow-500">
                {currentLanguage === 'ar' ? service.titleAr : service.title}
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 700,
              }}
            >
              {currentLanguage === 'ar' ? service.titleAr : service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 700,
                fontSize: '42px',
                lineHeight: '52px',
                color: '#4B2615',
                letterSpacing: '-0.4px',
              }}
            >
              {currentLanguage === 'ar' ? service.titleAr : service.title}
            </h2>
            <p
              className="leading-relaxed"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '28px',
                color: '#1E1E1E',
                marginBottom: '24px',
              }}
            >
              {currentLanguage === 'ar' ? service.descriptionAr : service.description}
            </p>
          </div>

          <div
            className="rounded-lg p-8 mb-12"
            style={{
              backgroundColor: '#F3F3F3',
            }}
          >
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 700,
                fontSize: '28px',
                lineHeight: '36px',
                color: '#4B2615',
              }}
            >
              {currentLanguage === 'ar' ? 'ما نقدمه' : 'What We Offer'}
            </h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Check className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '28px',
                      color: '#1E1E1E',
                    }}
                  >
                    {currentLanguage === 'ar' ? feature.ar : feature.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 700,
                fontSize: '28px',
                lineHeight: '36px',
                color: '#4B2615',
              }}
            >
              {currentLanguage === 'ar' ? 'اتصل بنا للحصول على استشارة' : 'Contact Us for Consultation'}
            </h3>
            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '28px',
                color: '#1E1E1E',
              }}
            >
              {currentLanguage === 'ar'
                ? 'هل أنت مستعد للبدء؟ اتصل بنا اليوم لمناقشة احتياجاتك القانونية.'
                : 'Ready to get started? Contact us today to discuss your legal needs.'}
            </p>
            <Link
              href="/contact"
              className="inline-block text-white px-8 py-3 rounded-md font-semibold transition-all duration-300"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                backgroundColor: '#4B2615',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '26px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4B2615';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
