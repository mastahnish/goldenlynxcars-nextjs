import type { FAQSection } from '@/payload/payload-types';

type FAQ = FAQSection['faqs'][number];

export type { FAQ, FAQSection };
