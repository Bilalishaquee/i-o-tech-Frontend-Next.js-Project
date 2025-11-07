'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleLanguage, setLanguage } from '@/store/slices/languageSlice';
import { toggleSearch, closeSearch } from '@/store/slices/searchSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { mockServices, servicesDropdown } from '@/lib/mockData';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Map dropdown service names to service IDs
const getServiceId = (serviceName: string): string => {
  const serviceMap: { [key: string]: string } = {
    'Legal Consultation Services': 'legal-consultation-services',
    'Foreign Investment Services': 'foreign-investment-services',
    'Contracts': 'contracts',
    'Notarization': 'notarization',
    'Insurance': 'insurance',
    'Litigation and Defense in All Cases': 'litigation-defense-all-cases',
    'Banks and Financial Institutions': 'banks-financial-institutions',
    'Corporate Governance Services': 'corporate-governance-services',
    'Companies Liquidation': 'companies-liquidation',
    'Internal Regulations for Companies': 'internal-regulations-companies',
    'Services for Companies and Institutions': 'services-companies-institutions',
    'Arbitration': 'arbitration',
    'Intellectual Property': 'intellectual-property',
    'Corporate Restructuring and Reorganization': 'corporate-restructuring-reorganization',
    'Establishing National and Foreign Companies': 'establishing-national-foreign-companies',
    'Commercial Agencies': 'commercial-agencies',
    'Supporting Vision 2030': 'supporting-vision-2030',
    'Estates': 'estates',
  };
  return serviceMap[serviceName] || 'legal-consultation-services';
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const isSearchOpen = useAppSelector((state) => state.search.isSearchOpen);
  const { t } = useTranslation();

  // Search form
  const searchFormik = useFormik({
    initialValues: {
      query: '',
    },
    validationSchema: Yup.object({
      query: Yup.string().required('Search query is required'),
    }),
    onSubmit: (values) => {
      if (values.query.trim()) {
        router.push(`/search?query=${encodeURIComponent(values.query.trim())}`);
        dispatch(closeSearch());
        searchFormik.resetForm();
      }
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLanguageDropdownOpen && !target.closest('.language-dropdown-container')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isServicesOpen && !target.closest('.services-dropdown-container')) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);


  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/team', label: t('nav.team') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const handleTeamClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (pathname === '/') {
      // If already on home page, scroll to team section
      setTimeout(() => {
        const teamSection = document.getElementById('team');
        if (teamSection) {
          const headerHeight = 64; // Header height
          const elementPosition = teamSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If on another page, navigate to home with hash and let the page handle scrolling
      router.push('/#team');
      // After navigation, scroll to the section
      setTimeout(() => {
        const checkAndScroll = () => {
          const teamSection = document.getElementById('team');
          if (teamSection) {
            const headerHeight = 64;
            const elementPosition = teamSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            // If section not found yet, try again after a short delay
            setTimeout(checkAndScroll, 100);
          }
        };
        // Wait for page to load
        setTimeout(checkAndScroll, 500);
      }, 0);
    }
  };

  const handleClientsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (pathname === '/') {
      // If already on home page, scroll to clients section
      setTimeout(() => {
        const clientsSection = document.getElementById('clients');
        if (clientsSection) {
          const headerHeight = 64; // Header height
          const elementPosition = clientsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If on another page, navigate to home with hash and let the page handle scrolling
      router.push('/#clients');
      // After navigation, scroll to the section
      setTimeout(() => {
        const checkAndScroll = () => {
          const clientsSection = document.getElementById('clients');
          if (clientsSection) {
            const headerHeight = 64;
            const elementPosition = clientsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            // If section not found yet, try again after a short delay
            setTimeout(checkAndScroll, 100);
          }
        };
        // Wait for page to load
        setTimeout(checkAndScroll, 500);
      }, 0);
    }
  };

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 relative">
          {/* Left spacer for centering */}
          <div className="hidden md:block flex-1"></div>

          {/* Centered Navigation Links */}
          <div 
            className="hidden md:flex items-center space-x-8 rtl:space-x-reverse absolute"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            {navLinks.map((link) => {
              if (link.href === '/services') {
                return (
                  <div
                    key={link.href}
                    className="relative services-dropdown-container"
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        href="/services"
                        className={`text-white hover:text-yellow-500 transition-colors ${
                          pathname === link.href ? 'text-yellow-500' : ''
                        }`}
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '26px',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                        }}
                      >
                        {link.label}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsServicesOpen(!isServicesOpen);
                        }}
                        className="text-white hover:text-yellow-500 transition-colors"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        aria-label="Toggle services dropdown"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Services Dropdown Menu */}
                    {isServicesOpen && (
                      <div
                      className="fixed top-160 left-0 right-0 z-50 flex justify-center w-full"
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                      }}
                      >
                        <div 
                          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                          style={{
                            backgroundColor: '#4B2615',
                            borderBottomLeftRadius: '12px',
                            borderBottomRightRadius: '12px',
                            paddingTop: '32px',
                            paddingBottom: '32px',
                          }}
                        >
                        <div className="grid grid-cols-4" style={{ gap: '60px' }}>
                          {/* Column 1 */}
                          <div className="flex flex-col" style={{ gap: '16px' }}>
                            {servicesDropdown.column1.map((service, index) => (
                              <Link
                                key={index}
                                href={`/services/${getServiceId(service)}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="text-white hover:text-yellow-500 transition-colors"
                                style={{
                                  fontFamily: 'var(--font-dm-sans), sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '26px',
                                  color: '#FFFFFF',
                                  textDecoration: 'none',
                                }}
                              >
                                {service}
                              </Link>
                            ))}
                          </div>

                          {/* Column 2 */}
                          <div className="flex flex-col" style={{ gap: '16px' }}>
                            {servicesDropdown.column2.map((service, index) => (
                              <Link
                                key={index}
                                href={`/services/${getServiceId(service)}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="text-white hover:text-yellow-500 transition-colors"
                                style={{
                                  fontFamily: 'var(--font-dm-sans), sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '26px',
                                  color: '#FFFFFF',
                                  textDecoration: 'none',
                                }}
                              >
                                {service}
                              </Link>
                            ))}
                          </div>

                          {/* Column 3 */}
                          <div className="flex flex-col" style={{ gap: '16px' }}>
                            {servicesDropdown.column3.map((service, index) => (
                              <Link
                                key={index}
                                href={`/services/${getServiceId(service)}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="text-white hover:text-yellow-500 transition-colors"
                                style={{
                                  fontFamily: 'var(--font-dm-sans), sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '26px',
                                  color: '#FFFFFF',
                                  textDecoration: 'none',
                                }}
                              >
                                {service}
                              </Link>
                            ))}
                          </div>

                          {/* Column 4 */}
                          <div className="flex flex-col" style={{ gap: '16px' }}>
                            {servicesDropdown.column4.map((service, index) => (
                              <Link
                                key={index}
                                href={`/services/${getServiceId(service)}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="text-white hover:text-yellow-500 transition-colors"
                                style={{
                                  fontFamily: 'var(--font-dm-sans), sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '26px',
                                  color: '#FFFFFF',
                                  textDecoration: 'none',
                                }}
                              >
                                {service}
                              </Link>
                            ))}
                          </div>
                        </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              // Handle team link specially for smooth scrolling to team section
              if (link.href === '/team') {
                return (
                  <Link
                    key={link.href}
                    href="/team"
                    onClick={handleTeamClick}
                    className={`text-white hover:text-yellow-500 transition-colors ${
                      pathname === link.href ? 'text-yellow-500' : ''
                    }`}
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              }

              // Handle about and contact links to scroll to clients section
              if (link.href === '/about' || link.href === '/contact') {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleClientsClick}
                    className={`text-white hover:text-yellow-500 transition-colors ${
                      pathname === link.href ? 'text-yellow-500' : ''
                    }`}
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white hover:text-yellow-500 transition-colors ${
                    pathname === link.href ? 'text-yellow-500' : ''
                  }`}
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '26px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side - Search, Language Selector and Book Appointment */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <button
              onClick={() => dispatch(toggleSearch())}
              className="text-white hover:text-yellow-500 transition-colors mr-4 rtl:mr-0 rtl:ml-4"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Dropdown */}
            <div className="language-dropdown-container relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-yellow-500 transition-colors"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '26px',
                  color: '#FFFFFF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <span>{currentLanguage === 'en' ? 'En' : 'Ar'}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageDropdownOpen && (
                <div
                  className="absolute top-full right-0 rtl:left-0 rtl:right-auto mt-2 bg-white rounded-md shadow-lg py-2 z-50 min-w-[100px]"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  <button
                    onClick={() => {
                      dispatch(setLanguage('en'));
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-4 py-2 hover:bg-gray-100 transition-colors ${
                      currentLanguage === 'en' ? 'bg-gray-50 font-medium' : ''
                    }`}
                    style={{
                      color: currentLanguage === 'en' ? '#000000' : '#666666',
                      fontSize: '14px',
                    }}
                  >
                    En
                  </button>
                  <button
                    onClick={() => {
                      dispatch(setLanguage('ar'));
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-4 py-2 hover:bg-gray-100 transition-colors ${
                      currentLanguage === 'ar' ? 'bg-gray-50 font-medium' : ''
                    }`}
                    style={{
                      color: currentLanguage === 'ar' ? '#000000' : '#666666',
                      fontSize: '14px',
                    }}
                  >
                    Ar
                  </button>
                </div>
              )}
            </div>

            {/* Vertical Separator */}
            <div 
              className="h-4 w-px bg-white/40 mx-4"
            />

            {/* Book Appointment Button */}
            <button 
              className="border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-colors"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '17px',
                borderRadius: '8px',
              }}
            >
              {t('nav.bookAppointment')}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isSearchOpen && (
          <div className="py-3 border-t border-yellow-500/20">
            <form onSubmit={searchFormik.handleSubmit} className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="text"
                name="query"
                value={searchFormik.values.query}
                onChange={searchFormik.handleChange}
                onBlur={searchFormik.handleBlur}
                placeholder={t('search.placeholder')}
                className="flex-1 bg-white/10 border border-yellow-500/30 rounded-md px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-yellow-500"
                autoFocus
              />
              <button
                type="submit"
                className="bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium"
              >
                {t('search.placeholder')}
              </button>
            </form>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-500/20">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white hover:text-yellow-500 transition-colors ${
                    pathname === link.href ? 'text-yellow-500' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center space-x-1 rtl:space-x-reverse text-white hover:text-yellow-500 transition-colors w-full"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="ml-4 rtl:mr-4 rtl:ml-0 mt-2 space-y-2">
                    {mockServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="block text-white/80 hover:text-yellow-500 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                      >
                        {currentLanguage === 'ar' ? service.titleAr : service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse pt-3 border-t border-yellow-500/20">
                <button
                  onClick={() => {
                    dispatch(toggleSearch());
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => dispatch(toggleLanguage())}
                  className="text-white hover:text-yellow-500 transition-colors font-medium"
                >
                  {currentLanguage === 'en' ? 'AR' : 'EN'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
