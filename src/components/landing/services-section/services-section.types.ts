import type { ServicesSection } from '@/payload/payload-types';

type Service = ServicesSection['services'][number];

export type { Service, ServicesSection };
