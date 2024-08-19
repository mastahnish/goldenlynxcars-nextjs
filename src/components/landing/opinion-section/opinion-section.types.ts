import type { OpinionSection } from '@/payload/payload-types';

type Opinion = OpinionSection['opinions'][number];

export type { Opinion, OpinionSection };
