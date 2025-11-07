'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import HeroSection from '@/components/HeroSection';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      content: 'Law Firm is one of the leading legal offices',
    },
    {
      id: 2,
      content: 'Law Firm is one of the leading legal offices',
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/#team');
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/services');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* Blog Content */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Left Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div
                  className="mb-6 text-gray-400"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  Frameworks
                </div>
                <nav className="space-y-3">
                  <Link
                    href="/#team"
                    onClick={handleTeamClick}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      textDecoration: 'none',
                    }}
                  >
                    Team
                  </Link>
                  <Link
                    href="/services"
                    onClick={handleServicesClick}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      textDecoration: 'none',
                    }}
                  >
                    Services
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Back Button */}
              <Link
                href="/"
                className="inline-block mb-8 text-gray-700 hover:text-gray-900 transition-colors"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  textDecoration: 'none',
                }}
              >
                {t('blog.back')}
              </Link>

              {/* Main Title */}
              <h1
                className="text-center mb-8"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 700,
                  fontSize: '42px',
                  lineHeight: '52px',
                  color: '#4B2615',
                  letterSpacing: '-0.4px',
                }}
              >
                {t('blog.title')}
              </h1>

              {/* Introductory Paragraph */}
              <div className="mb-12">
                <p
                  className="text-left mb-4"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '28px',
                    color: '#1E1E1E',
                  }}
                >
                  {t('blog.intro')}
                </p>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-gray-900 underline"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                  }}
                >
                  {t('blog.readMore')}
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-8"></div>

              {/* Blog Posts */}
              <div className="space-y-8 mb-12">
                {blogPosts.map((post, index) => (
                  <div key={post.id}>
                    <div className="mb-4">
                      <p
                        className="text-left"
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '28px',
                          color: '#1E1E1E',
                        }}
                      >
                        {post.content}
                      </p>
                      <Link
                        href="#"
                        className="text-gray-700 hover:text-gray-900 underline inline-block mt-2"
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                        }}
                      >
                        {t('blog.readMore')}
                      </Link>
                    </div>
                    {index < blogPosts.length - 1 && (
                      <div className="border-t border-gray-200 mt-8"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center gap-4">
                <div
                  className="text-gray-400"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                >
                  {t('blog.pagination')}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                    }}
                  >
                    &lt;
                  </button>
                  {[1, 2].map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 ${
                        currentPage === page
                          ? 'bg-gray-200 text-gray-900 font-semibold'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: '16px',
                        fontWeight: currentPage === page ? 600 : 400,
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                    }}
                  >
                    &gt;
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                    }}
                  >
                    &gt;&gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

