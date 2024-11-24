import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { CarFleetCardDetails } from './car-fleet-card-details/car-fleet-card-details';
import { CarFleetCardGeneral } from './car-fleet-card-general';

import { Media } from '@/components/common/media/media';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { CarFleet } from './car-fleet-card.types';

type CarFleetCardProps = Readonly<{
	car: CarFleet;
	layout?: 'horizontal' | 'vertical';
}>;

export const CarFleetCard = ({
	car,
	layout = 'vertical',
}: CarFleetCardProps) => (
	<article
		className={twMerge(
			'mx-auto flex max-w-96 w-full gap-4 rounded-2xl border border-primary/10 bg-semi-black p-4',
			layout === 'horizontal' && 'md:max-w-3xl max-md:flex-col',
			layout === 'vertical' && 'flex-col',
		)}
	>
		<div
			className={twMerge(
				'relative shrink-0 aspect-video',
				layout === 'horizontal' && 'md:w-72 lg:w-96',
			)}
		>
			<Media resource={car.image} fill className="rounded-xl object-cover" />
		</div>
		<div className="w-full">
			<CarFleetCardGeneral car={car} />
			<CarFleetCardDetails details={car.details} />
			<div className="mt-8">
				<Button variant="ghost" icon={ArrowRight} moveIcon asChild>
					<Link href={`/auto/${car.slug}`}>Wylicz swoją cenę</Link>
				</Button>
			</div>
		</div>
	</article>
);
