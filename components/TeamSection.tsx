'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import { mockTeamMembers } from '@/lib/mockData';
import { ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import teamMemberImage from '../assests/2.png';

// WhatsApp Icon Component - Speech bubble with telephone receiver
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Speech bubble with tail pointing down-left - WhatsApp classic shape */}
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21Z" />
    {/* Telephone receiver inside - earpiece (top) */}
    <path d="M10.5 9c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5" />
    {/* Telephone receiver - middle curved connector */}
    <path d="M10.5 10.5c.5.3 1.5.3 2 0" />
    <path d="M10.5 11.5h3" />
    <path d="M10.5 12.5c.5-.3 1.5-.3 2 0" />
    {/* Telephone receiver - mouthpiece (bottom) */}
    <path d="M10.5 13.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5" />
  </svg>
);

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();

  const itemsToShow = 3;
  const maxIndex = Math.max(0, mockTeamMembers.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleMembers = mockTeamMembers.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <section id="team" className="relative bg-[#F3F3F3] py-20" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 700,
              fontSize: '42px',
              lineHeight: '52px',
              textAlign: 'center',
              letterSpacing: '-0.4px',
              color: '#4B2615',
            }}
          >
            {t('team.title')}
          </h2>
          <p 
            className="max-w-3xl mx-auto"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '28px',
              textAlign: 'center',
              color: '#1E1E1E',
              opacity: 0.7,
            }}
          >
            {t('team.description')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent border-none cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          {/* Team Members Carousel */}
          <div className="flex justify-center items-start gap-8 px-12">
            {visibleMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex-shrink-0"
                style={{ width: '280px' }}
              >
                {/* Profile Image */}
                <div className="relative w-full aspect-square mb-4">
                  <div className="absolute inset-0" style={{ backgroundColor: '#4B2615' }} />
                  <Image
                    src={teamMemberImage}
                    alt={currentLanguage === 'ar' ? member.nameAr : member.name}
                    fill
                    className="object-cover"
                    style={{ borderRadius: '10px' }}
                  />
                </div>

                {/* Name */}
                <h3 
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontWeight: 500,
                    fontSize: '22px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    color: '#4B2615',
                  }}
                >
                  {currentLanguage === 'ar' ? member.nameAr : member.name}
                </h3>

                {/* Position */}
                <p 
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '26px',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(21, 20, 57, 0.4)',
                  }}
                >
                  {currentLanguage === 'ar' ? member.roleAr : member.role}
                </p>

                {/* Social Media Icons */}
                <div className="flex justify-center items-center gap-4">
                  {/* WhatsApp Icon */}
                  <button
                    className="text-black hover:opacity-70 transition-opacity"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </button>
                  
                  {/* Phone Icon */}
                  <button
                    className="text-black hover:opacity-70 transition-opacity"
                    aria-label="Phone"
                  >
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  
                  {/* Email Icon */}
                  <button
                    className="text-black hover:opacity-70 transition-opacity"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent border-none cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
