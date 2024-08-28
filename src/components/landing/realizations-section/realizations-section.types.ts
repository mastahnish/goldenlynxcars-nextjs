import type { RealizationsSection } from '@/payload/payload-types';

type Realization = RealizationsSection['realizations'][number];

export type { Realization, RealizationsSection };
