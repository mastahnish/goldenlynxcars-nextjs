import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { Realization } from '../../realizations-section.types';

type RealizationsSectionListItemDetailsProps = Readonly<{
	realization: Realization;
}>;

export const RealizationsSectionListItemDetails = ({
	realization: { title, description },
}: RealizationsSectionListItemDetailsProps) => (
	<div className="relative z-1 flex w-full flex-col gap-6 rounded-b-2xl border border-primary/10 bg-semi-black p-4 sm:-ml-4 sm:rounded-t-2xl">
		<h3 className="text-xl font-bold text-white">{title}</h3>
		<p className="text-neutral-300">{description}</p>
		<div className="sm:mt-auto">
			<Button variant="ghost" size="small" icon={ArrowRight} moveIcon>
				Sprawdź realizację
			</Button>
		</div>
	</div>
);
