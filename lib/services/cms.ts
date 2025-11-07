/**
 * CMS API Service Layer
 * This service abstracts CMS API calls (Strapi) with mock data fallback
 * 
 * When Strapi is configured, replace mock data with actual API calls
 * Example: const response = await fetch(`${STRAPI_URL}/api/services?locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
 */

// CMS Configuration
const CMS_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api',
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false', // Default to true if not set
};

// Types
export interface HeroCTA {
  text: string;
  link: string;
  linkType: 'internal' | 'external';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  locale?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  image: string;
  locale?: string;
}

export interface Subscription {
  id: string;
  email: string;
  createdAt: string;
}

// Mock Data Imports
import { mockServices, mockTeamMembers } from '@/lib/mockData';

/**
 * Get Hero Section CTA Configuration from CMS
 */
export async function getHeroCTA(locale: string = 'en'): Promise<HeroCTA> {
  if (CMS_CONFIG.useMockData) {
    // Mock CTA - in real implementation, this would come from Strapi
    // This can be configured in CMS: text, link (internal or external), and linkType
    return {
      text: locale === 'ar' ? 'اقرأ المزيد' : 'Read More',
      link: '/services', // Default to services page
      linkType: 'internal',
    };
  }

  try {
    const response = await fetch(
      `${CMS_CONFIG.apiUrl}/hero?locale=${locale}&populate=*`
    );
    const data = await response.json();
    return {
      text: data.data.ctaText,
      link: data.data.ctaLink,
      linkType: data.data.ctaLinkType,
    };
  } catch (error) {
    console.error('Error fetching hero CTA from CMS:', error);
    return {
      text: locale === 'ar' ? 'اقرأ المزيد' : 'Read More',
      link: '#',
      linkType: 'internal',
    };
  }
}

/**
 * Get Services with Pagination
 */
export async function getServices(
  locale: string = 'en',
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string
): Promise<PaginatedResponse<Service>> {
  if (CMS_CONFIG.useMockData) {
    let services = mockServices.map((service) => ({
      ...service,
      slug: service.id,
      locale,
    }));

    // Filter by search query if provided
    if (searchQuery) {
      services = services.filter((service) => {
        const title = locale === 'ar' ? service.titleAr : service.title;
        const description = locale === 'ar' ? service.descriptionAr : service.description;
        const query = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query)
        );
      });
    }

    // Paginate
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = services.slice(startIndex, endIndex);
    const total = services.length;
    const pageCount = Math.ceil(total / pageSize);

    return {
      data: paginatedData,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      },
    };
  }

  try {
    const params = new URLSearchParams({
      locale,
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
    });

    if (searchQuery) {
      params.append('filters[title][$containsi]', searchQuery);
    }

    const response = await fetch(
      `${CMS_CONFIG.apiUrl}/services?${params.toString()}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching services from CMS:', error);
    throw error;
  }
}

/**
 * Get Service by Slug
 */
export async function getServiceBySlug(
  slug: string,
  locale: string = 'en'
): Promise<Service | null> {
  if (CMS_CONFIG.useMockData) {
    const service = mockServices.find((s) => s.id === slug);
    if (!service) return null;
    return {
      ...service,
      slug: service.id,
      locale,
    };
  }

  try {
    const response = await fetch(
      `${CMS_CONFIG.apiUrl}/services?filters[slug][$eq]=${slug}&locale=${locale}`
    );
    const data = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching service from CMS:', error);
    return null;
  }
}

/**
 * Get Team Members with Pagination
 */
export async function getTeamMembers(
  locale: string = 'en',
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string
): Promise<PaginatedResponse<TeamMember>> {
  if (CMS_CONFIG.useMockData) {
    let members = mockTeamMembers.map((member) => ({
      ...member,
      locale,
    }));

    // Filter by search query if provided
    if (searchQuery) {
      members = members.filter((member) => {
        const name = locale === 'ar' ? member.nameAr : member.name;
        const role = locale === 'ar' ? member.roleAr : member.role;
        const query = searchQuery.toLowerCase();
        return (
          name.toLowerCase().includes(query) ||
          role.toLowerCase().includes(query)
        );
      });
    }

    // Paginate
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = members.slice(startIndex, endIndex);
    const total = members.length;
    const pageCount = Math.ceil(total / pageSize);

    return {
      data: paginatedData,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      },
    };
  }

  try {
    const params = new URLSearchParams({
      locale,
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
    });

    if (searchQuery) {
      params.append('filters[name][$containsi]', searchQuery);
    }

    const response = await fetch(
      `${CMS_CONFIG.apiUrl}/team-members?${params.toString()}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching team members from CMS:', error);
    throw error;
  }
}

/**
 * Search Services and Team Members
 */
export async function searchContent(
  query: string,
  locale: string = 'en',
  page: number = 1,
  pageSize: number = 10
): Promise<{
  services: PaginatedResponse<Service>;
  teamMembers: PaginatedResponse<TeamMember>;
}> {
  const [services, teamMembers] = await Promise.all([
    getServices(locale, page, pageSize, query),
    getTeamMembers(locale, page, pageSize, query),
  ]);

  return { services, teamMembers };
}

/**
 * Subscribe Email to Newsletter (Store in CMS)
 */
export async function subscribeEmail(email: string): Promise<Subscription> {
  if (CMS_CONFIG.useMockData) {
    // Mock subscription - in real implementation, this would POST to Strapi
    return {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };
  }

  try {
    const response = await fetch(`${CMS_CONFIG.apiUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe email');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error subscribing email to CMS:', error);
    throw error;
  }
}

