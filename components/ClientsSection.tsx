'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clientImage from '../assests/2.png';

export default function ClientsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % 1); // Only one testimonial for now
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + 1) % 1);
  };

  return (
    <section id="clients" className="relative py-20" style={{ backgroundColor: '#4B2615', minHeight: '853px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="mb-12 text-left">
          <h2 
            className="mb-6 text-white"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '48px',
              lineHeight: '1.2',
              textAlign: 'left',
            }}
          >
            {t('clients.title')}
          </h2>
          <p 
            className="text-white max-w-4xl"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '1.6',
              textAlign: 'left',
            }}
          >
            {t('clients.description')}
          </p>
        </div>

        {/* Testimonial Block */}
        <div 
          className="relative p-8 md:p-12"
          style={{ backgroundColor: '#4B2615' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Client Image */}
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0" style={{ backgroundColor: '#643F2E' }} />
              <Image
                src={clientImage}
                alt={t('clients.testimonialAuthor')}
                fill
                className="object-cover"
              />
            </div>

            {/* Testimonial Content */}
            <div className="flex flex-col justify-between h-full">
              <div>
                {/* Testimonial Text */}
                <p 
                  className="text-white mb-8"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '1.6',
                    textAlign: 'left',
                  }}
                >
                  &ldquo;{t('clients.testimonialText')}&rdquo;
                </p>

                {/* Client Name */}
                <h4 
                  className="text-white mb-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '26px',
                    lineHeight: '1.2',
                    textAlign: 'left',
                  }}
                >
                  {t('clients.testimonialAuthor')}
                </h4>

                {/* Client Title */}
                <p 
                  className="text-white"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '17px',
                    lineHeight: '1.4',
                    textAlign: 'left',
                  }}
                >
                  {t('clients.testimonialRole')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Bottom Right */}
          <div className="absolute bottom-8 right-8 flex gap-4">
            {/* Left Arrow Button - Dark brown background with white arrow */}
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity"
              style={{ backgroundColor: '#5C3B2E' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>

            {/* Right Arrow Button - White background with dark brown arrow */}
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity"
              style={{ backgroundColor: '#FFFFFF' }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" style={{ color: '#5C3B2E' }} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
