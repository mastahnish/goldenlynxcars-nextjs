import { Media } from '../common/media/media';
import { Title } from '../common/title';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetPageHeaderProps = Readonly<{
	car: CarFleet;
}>;

export const CarFleetPageHeader = ({ car }: CarFleetPageHeaderProps) => (
	<header className="relative overflow-hidden bg-black pb-20 pt-28 sm:pt-40 lg:h-96 lg:pt-44">
		<div className="relative z-1 flex px-4 sm:px-8 lg:w-1/2 lg:justify-end">
			<Title label={car.name} gap="small">
				{car.name}
			</Title>
		</div>
		<div className="absolute inset-y-0 right-0 z-10 hidden w-1/2 lg:block">
			<Media resource={car.image} fill className="object-cover" />
		</div>
	</header>
);
