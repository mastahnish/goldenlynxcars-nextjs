import { CarFleetCardDetails } from './car-fleet-card-details/car-fleet-card-details';
import { CarFleetCardGeneral } from './car-fleet-card-general';

import { Media } from '@/components/common/media';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { CarFleet } from './car-fleet-card.types';

type CarFleetCardProps = Readonly<{
	car: CarFleet;
}>;

export const CarFleetCard = ({ car }: CarFleetCardProps) => (
	<article className="mx-auto w-full max-w-96 rounded-2xl border border-primary/10 bg-semi-black p-4">
		<div className="relative mb-4 h-48">
			<Media resource={car.image} fill className="rounded-xl object-cover" />
		</div>
		<CarFleetCardGeneral car={car} />
		<CarFleetCardDetails details={car.details} />
		<div className="mt-8">
			<Button variant="ghost" icon={ArrowRight} moveIcon>
				Wylicz swoją cenę
			</Button>
		</div>
	</article>
);
