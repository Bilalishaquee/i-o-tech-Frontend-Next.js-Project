'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from '@/hooks/useTranslation';
import HeroSection from '@/components/HeroSection';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getServices, getTeamMembers } from '@/lib/services/cms';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';
import { Search } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RESULTS_PER_PAGE = 10;

export default function ServicesPage() {
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const [activeTab, setActiveTab] = useState<'services' | 'team'>('services');
  
  // Services state
  const [services, setServices] = useState<any[]>([]);
  const [servicesPage, setServicesPage] = useState(1);
  const [servicesTotalPages, setServicesTotalPages] = useState(0);
  const [servicesLoading, setServicesLoading] = useState(false);

  // Team state
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamPage, setTeamPage] = useState(1);
  const [teamTotalPages, setTeamTotalPages] = useState(0);
  const [teamLoading, setTeamLoading] = useState(false);

  // Search form
  const searchFormik = useFormik({
    initialValues: {
      search: searchQuery,
    },
    validationSchema: Yup.object({
      search: Yup.string(),
    }),
    onSubmit: (values) => {
      const params = new URLSearchParams();
      if (values.search) {
        params.set('search', values.search);
      }
      router.push(`/services?${params.toString()}`);
    },
  });

  // Load services
  useEffect(() => {
    setServicesLoading(true);
    getServices(currentLanguage, servicesPage, RESULTS_PER_PAGE, searchQuery || undefined)
      .then((response) => {
        setServices(response.data);
        setServicesTotalPages(response.meta.pagination.pageCount);
        setServicesLoading(false);
      })
      .catch((error) => {
        console.error('Error loading services:', error);
        setServicesLoading(false);
      });
  }, [currentLanguage, servicesPage, searchQuery]);

  // Load team members
  useEffect(() => {
    setTeamLoading(true);
    getTeamMembers(currentLanguage, teamPage, RESULTS_PER_PAGE, searchQuery || undefined)
      .then((response) => {
        setTeamMembers(response.data);
        setTeamTotalPages(response.meta.pagination.pageCount);
        setTeamLoading(false);
      })
      .catch((error) => {
        console.error('Error loading team members:', error);
        setTeamLoading(false);
      });
  }, [currentLanguage, teamPage, searchQuery]);

  const handleServicesPageChange = (newPage: number) => {
    setServicesPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeamPageChange = (newPage: number) => {
    setTeamPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* Services Content */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-block mb-10 text-gray-700 hover:text-gray-900 transition-colors"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              textDecoration: 'none',
            }}
          >
            {t('services.page.back')}
          </Link>

          {/* Main Title */}
          <h1
            className="text-center mb-10"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 700,
              fontSize: '42px',
              lineHeight: '52px',
              color: '#4B2615',
              letterSpacing: '-0.4px',
            }}
          >
            {t('services.page.title')}
          </h1>

          {/* Search and Tabs Section */}
          <div className="mb-12">
            {/* Search Input */}
            <form onSubmit={searchFormik.handleSubmit} className="mb-6">
              <div className="flex gap-3 max-w-md">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="search"
                    placeholder={currentLanguage === 'ar' ? 'بحث...' : 'Search...'}
                    value={searchFormik.values.search}
                    onChange={searchFormik.handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2615]"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4B2615] text-white rounded-md hover:bg-[#3a1f0f] transition-colors"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  {currentLanguage === 'ar' ? 'بحث' : 'Search'}
                </button>
              </div>
            </form>

            {/* Tabs */}
            <Tabs.Root
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as 'services' | 'team')}
              className="w-full"
            >
              <Tabs.List className="flex border-b border-gray-200 mb-6">
                <Tabs.Trigger
                  value="services"
                  className="px-6 py-3 font-semibold text-gray-600 border-b-2 border-transparent data-[state=active]:border-[#4B2615] data-[state=active]:text-[#4B2615] transition-colors"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  {t('services.title')}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="team"
                  className="px-6 py-3 font-semibold text-gray-600 border-b-2 border-transparent data-[state=active]:border-[#4B2615] data-[state=active]:text-[#4B2615] transition-colors"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  {t('team.title')}
                </Tabs.Trigger>
              </Tabs.List>

              {/* Services Tab */}
              <Tabs.Content value="services" className="mt-6">
                {servicesLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{currentLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{currentLanguage === 'ar' ? 'لا توجد خدمات' : 'No services found'}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                          <h3
                            className="text-xl font-bold text-[#4B2615] mb-2"
                            style={{
                              fontFamily: 'var(--font-dm-sans), sans-serif',
                            }}
                          >
                            {currentLanguage === 'ar' ? service.titleAr : service.title}
                          </h3>
                          <p
                            className="text-gray-600 text-sm line-clamp-3"
                            style={{
                              fontFamily: 'var(--font-dm-sans), sans-serif',
                            }}
                          >
                            {currentLanguage === 'ar' ? service.descriptionAr : service.description}
                          </p>
                        </Link>
                      ))}
                    </div>

                    {/* Services Pagination */}
                    {servicesTotalPages > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleServicesPageChange(servicesPage - 1)}
                          disabled={servicesPage === 1}
                          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          {currentLanguage === 'ar' ? 'السابق' : 'Previous'}
                        </button>
                        <span className="px-4 py-2">
                          {currentLanguage === 'ar' ? 'صفحة' : 'Page'} {servicesPage} {currentLanguage === 'ar' ? 'من' : 'of'} {servicesTotalPages}
                        </span>
                        <button
                          onClick={() => handleServicesPageChange(servicesPage + 1)}
                          disabled={servicesPage === servicesTotalPages}
                          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          {currentLanguage === 'ar' ? 'التالي' : 'Next'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </Tabs.Content>

              {/* Team Tab */}
              <Tabs.Content value="team" className="mt-6">
                {teamLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{currentLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
                  </div>
                ) : teamMembers.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{currentLanguage === 'ar' ? 'لا يوجد أعضاء فريق' : 'No team members found'}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                        >
                          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                            <Image
                              src={member.image}
                              alt={currentLanguage === 'ar' ? member.nameAr : member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3
                            className="text-xl font-bold text-[#4B2615] mb-2"
                            style={{
                              fontFamily: 'var(--font-dm-sans), sans-serif',
                            }}
                          >
                            {currentLanguage === 'ar' ? member.nameAr : member.name}
                          </h3>
                          <p
                            className="text-gray-600"
                            style={{
                              fontFamily: 'var(--font-dm-sans), sans-serif',
                            }}
                          >
                            {currentLanguage === 'ar' ? member.roleAr : member.role}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Team Pagination */}
                    {teamTotalPages > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleTeamPageChange(teamPage - 1)}
                          disabled={teamPage === 1}
                          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          {currentLanguage === 'ar' ? 'السابق' : 'Previous'}
                        </button>
                        <span className="px-4 py-2">
                          {currentLanguage === 'ar' ? 'صفحة' : 'Page'} {teamPage} {currentLanguage === 'ar' ? 'من' : 'of'} {teamTotalPages}
                        </span>
                        <button
                          onClick={() => handleTeamPageChange(teamPage + 1)}
                          disabled={teamPage === teamTotalPages}
                          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          {currentLanguage === 'ar' ? 'التالي' : 'Next'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
