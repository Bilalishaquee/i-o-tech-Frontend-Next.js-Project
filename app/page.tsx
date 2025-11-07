'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import ClientsSection from '@/components/ClientsSection';

export default function Home() {
  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1); // Remove the '#' symbol
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerHeight = 64; // Header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);

  return (
    <>
      <div className="relative">
        <HeroSection />
      </div>
      <TeamSection />
      <ClientsSection />
    </>
  );
}
