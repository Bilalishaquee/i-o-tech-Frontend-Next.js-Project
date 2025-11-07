'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { startSubmission, submitSuccess, submitError, resetSubscription } from '@/store/slices/subscriptionSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { Facebook, Twitter } from 'lucide-react';
import { useEffect } from 'react';

export default function Footer() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const { submittedEmails, isSubmitting, error, success } = useAppSelector((state) => state.subscription);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (submittedEmails.includes(values.email)) {
        dispatch(submitError(t('footer.subscribeError')));
        return;
      }

      dispatch(startSubmission());

      try {
        // Store subscription in CMS
        const { subscribeEmail } = await import('@/lib/services/cms');
        await subscribeEmail(values.email);
        dispatch(submitSuccess(values.email));
        resetForm();
      } catch (error) {
        console.error('Error subscribing email:', error);
        dispatch(submitError(t('footer.subscribeError')));
      }
    },
  });

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetSubscription());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const footerLinks = [
    { label: currentLanguage === 'ar' ? 'من نحن' : 'About', href: '/about' },
    { label: currentLanguage === 'ar' ? 'استراتيجيتنا' : 'Our Strategy', href: '/strategy' },
    { label: currentLanguage === 'ar' ? 'مزايانا' : 'Our Advantages', href: '/advantages' },
    { label: currentLanguage === 'ar' ? 'المسؤولية الاجتماعية' : 'Social Responsibility', href: '/social-responsibility' },
    { label: currentLanguage === 'ar' ? 'خدماتنا' : 'Our Services', href: '/services' },
  ];

  return (
    <>
      {/* White Space Above Footer */}
      <div 
        className="w-full"
        style={{
          height: '25px',
          backgroundColor: '#FAFAFA',
        }}
      />
      <footer 
        className="text-white relative"
        style={{ 
          backgroundColor: '#4B2615',
          minHeight: '256px',
          fontFamily: 'var(--font-dm-sans), sans-serif',
        }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section - Email Subscription and Contacts */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Email Subscription */}
          <div className="flex items-center gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '16px',
                lineHeight: '26px',
              }}
            />
            <button
              type="button"
              onClick={() => formik.handleSubmit()}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg text-white border border-white transition-colors disabled:opacity-50 hover:bg-white/10"
              style={{
                backgroundColor: '#4B2615',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '17px',
                borderRadius: '8px',
              }}
            >
              {t('footer.subscribeButton')}
            </button>
          </div>

          {/* Contacts and Social Icons */}
          <div className="flex items-center gap-6">
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '16px',
                lineHeight: '26px',
                color: '#FFFFFF',
              }}
            >
              Contacts
            </span>
            <div className="flex items-center gap-4">
              {/* Twitter Icon */}
              <a href="#" className="text-white hover:opacity-70 transition-opacity" aria-label="Twitter">
                <Twitter className="w-5 h-5" strokeWidth={1.5} />
              </a>
              {/* Facebook Icon */}
              <a href="#" className="text-white hover:opacity-70 transition-opacity" aria-label="Facebook">
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
              {/* Google+ Icon */}
              <a href="#" className="text-white hover:opacity-70 transition-opacity" aria-label="Google Plus">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="w-full mb-6"
          style={{
            height: '2px',
            backgroundColor: '#FFFFFF',
            opacity: 0.3,
          }}
        />

        {/* Bottom Section - Navigation Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '26px',
                  color: '#FFFFFF',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-white"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
              color: '#FFFFFF',
              textAlign: 'right',
            }}
          >
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
