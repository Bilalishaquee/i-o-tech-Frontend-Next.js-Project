'use client';

import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getHeroCTA } from '@/lib/services/cms';
import Link from 'next/link';
import heroImage from '../assests/1.jpg';
import portraitImage from '../assests/2.png';

export default function HeroSection() {
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();
  const [cta, setCta] = useState<{ text: string; link: string; linkType: 'internal' | 'external' } | null>(null);

  useEffect(() => {
    getHeroCTA(currentLanguage).then(setCta);
  }, [currentLanguage]);

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ paddingTop: '0' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
          style={{ filter: 'grayscale(100%)' }}
          priority
        />
        {/* Linear Gradient Overlay with two color stops */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(75, 38, 21, 0.278) 28%, rgba(75, 38, 21, 0.678) 68%)'
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center relative">
          {/* Left Navigation Controls - Arrow and Dots aligned vertically */}
          <div 
            className="absolute flex flex-col items-center"
            style={{
              left: '1.1%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Left Arrow - Top */}
            <button
              className="mb-6 text-white hover:text-yellow-500 transition-colors flex items-center justify-center"
              aria-label="Previous slide"
              style={{
                fontFamily: 'FontAwesome',
                fontSize: '30px',
                lineHeight: '34px',
                color: '#FFFFFF',
                width: '11.95px',
                height: '35px',
                textAlign: 'center',
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Navigation Dots - Below Arrow, vertically aligned */}
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex items-center justify-center"
                style={{
                  height: '10px',
                  fontSize: '12px',
                  lineHeight: '36px',
                  color: '#FFFFFF',
                  marginBottom: index < 4 ? '20px' : '0',
                }}
              >
                {index === 0 ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border border-white bg-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Left Side - Content */}
          <div className="flex-1 flex items-center pl-20">

            {/* Text Content */}
            <div 
              className="flex-1"
              style={{
                width: '700px',
                height: '119px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            >
              <h1 
                className="text-white mb-4"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 700,
                  fontSize: '40px',
                  lineHeight: '28px',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  width: '264px',
                  height: '28px',
                }}
              >
                {t('hero.title')}
              </h1>
              <p 
                className="text-white mb-6"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#FFFFFF',
                  width: '700px',
                  height: '56px',
                }}
              >
                {t('hero.subtitle')}
              </p>
              {cta && (
                cta.linkType === 'external' ? (
                  <a
                    href={cta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 inline-block"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      textDecoration: 'none',
                    }}
                  >
                    {cta.text}
                  </a>
                ) : (
                  <Link
                    href={cta.link}
                    className="bg-white text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 inline-block"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      textDecoration: 'none',
                    }}
                  >
                    {cta.text}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Right Side - Portrait */}
          <div className="hidden lg:block flex-shrink-0 ml-8">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0" style={{ backgroundColor: '#4B2615' }} />
              <Image
                src={portraitImage}
                alt="Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
