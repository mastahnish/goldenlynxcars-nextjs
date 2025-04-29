import Link from 'next/link';

import { Accordion } from '@/components/ui/accordion/accordion';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { Service } from '../services-section.types';
import type { UrlObject } from 'url';

type ServicesSectionAccordionContentProps = Readonly<{
	service: Service;
}>;

export const ServicesSectionAccordionContent = ({
	service: { content, href },
}: ServicesSectionAccordionContentProps) => (
	<Accordion.Content
		bottomSection={
			<Button variant="ghost" icon={ArrowRight} moveIcon asChild>
				<Link href={href as unknown as UrlObject}>Dowiedz się wiecej</Link>
			</Button>
		}
	>
		{content}
	</Accordion.Content>
);
