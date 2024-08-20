import { Accordion } from '@/components/ui/accordion/accordion';
import { Button } from '@/components/ui/button/button';

type ServicesSectionAccordionContentProps = Readonly<{
	content: string;
}>;

export const ServicesSectionAccordionContent = ({
	content,
}: ServicesSectionAccordionContentProps) => (
	<Accordion.Content
		bottomSection={
			<Button variant="ghost" withArrow>
				Dowiedz się wiecej
			</Button>
		}
	>
		{content}
	</Accordion.Content>
);
