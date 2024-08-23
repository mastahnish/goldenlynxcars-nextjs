import { Accordion } from '@/components/ui/accordion/accordion';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

type ServicesSectionAccordionContentProps = Readonly<{
	content: string;
}>;

export const ServicesSectionAccordionContent = ({
	content,
}: ServicesSectionAccordionContentProps) => (
	<Accordion.Content
		bottomSection={
			<Button variant="ghost" icon={ArrowRight} moveIcon>
				Dowiedz się wiecej
			</Button>
		}
	>
		{content}
	</Accordion.Content>
);
