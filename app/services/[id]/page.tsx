import ServiceDetailClient from './ServiceDetailClient';
import { mockServices } from '@/lib/mockData';

export function generateStaticParams() {
  return mockServices.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return <ServiceDetailClient id={params.id} />;
}
