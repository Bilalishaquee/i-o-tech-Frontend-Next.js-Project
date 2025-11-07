'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import { searchContent } from '@/lib/services/cms';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';

const RESULTS_PER_PAGE = 10;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchContent(query, currentLanguage, page, RESULTS_PER_PAGE)
        .then(({ services, teamMembers }) => {
          const allResults = [
            ...services.data.map((s) => ({ ...s, type: 'service' })),
            ...teamMembers.data.map((t) => ({ ...t, type: 'team' })),
          ];
          setResults(allResults);
          // Use services pagination as reference (both should have similar counts)
          setTotalResults(services.meta.pagination.total + teamMembers.meta.pagination.total);
          setTotalPages(Math.max(services.meta.pagination.pageCount, teamMembers.meta.pagination.pageCount));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error searching:', error);
          setLoading(false);
        });
    } else {
      setResults([]);
      setTotalResults(0);
      setTotalPages(0);
    }
  }, [query, page, currentLanguage]);

  const handlePageChange = (newPage: number) => {
    router.push(`/search?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 w-full">
        <Image
          src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Search"
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
              <span className="text-yellow-500">{t('search.results')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t('search.results')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 mb-4">
            <Search className="w-5 h-5" />
            <span>
              {currentLanguage === 'ar' ? 'البحث عن' : 'Searching for'}: <strong className="text-[#4b2e05]">{query}</strong>
            </span>
          </div>
          <p className="text-gray-600">
            {totalResults} {currentLanguage === 'ar' ? 'نتيجة' : 'results found'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">{currentLanguage === 'ar' ? 'جاري البحث...' : 'Searching...'}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">{t('search.noResults')}</h2>
            <p className="text-gray-500">
              {currentLanguage === 'ar'
                ? 'جرب البحث بكلمات مختلفة'
                : 'Try searching with different keywords'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 mb-8">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  {result.type === 'service' ? (
                    <Link href={`/services/${result.id}`} className="block">
                      <span className="text-xs text-yellow-600 font-semibold uppercase mb-2 block">
                        {currentLanguage === 'ar' ? 'خدمة' : 'Service'}
                      </span>
                      <h3 className="text-xl font-bold text-[#4b2e05] mb-2 hover:text-yellow-600 transition-colors">
                        {currentLanguage === 'ar' ? result.titleAr : result.title}
                      </h3>
                      <p className="text-gray-600">
                        {currentLanguage === 'ar' ? result.descriptionAr : result.description}
                      </p>
                    </Link>
                  ) : (
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={result.image}
                          alt={currentLanguage === 'ar' ? result.nameAr : result.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-yellow-600 font-semibold uppercase mb-1 block">
                          {currentLanguage === 'ar' ? 'عضو الفريق' : 'Team Member'}
                        </span>
                        <h3 className="text-lg font-bold text-[#4b2e05]">
                          {currentLanguage === 'ar' ? result.nameAr : result.name}
                        </h3>
                        <p className="text-gray-600">
                          {currentLanguage === 'ar' ? result.roleAr : result.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  <ChevronLeft className="w-4 h-4 inline" />
                  <span className="ml-1">{currentLanguage === 'ar' ? 'السابق' : 'Previous'}</span>
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-md border transition-colors ${
                            pageNum === page
                              ? 'bg-[#4B2615] text-white border-[#4B2615]'
                              : 'border-gray-300 hover:bg-gray-100'
                          }`}
                          style={{
                            fontFamily: 'var(--font-dm-sans), sans-serif',
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return (
                        <span key={pageNum} className="px-2 py-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  <span className="mr-1">{currentLanguage === 'ar' ? 'التالي' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4 inline" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
