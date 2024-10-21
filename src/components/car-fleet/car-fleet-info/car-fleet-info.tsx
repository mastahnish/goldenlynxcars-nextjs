import { CarFleetInfoDescription } from './car-fleet-info-description';
import { CarFleetInfoDetails } from './car-fleet-info-details/car-fleet-info-details';

import { Container } from '@/components/common/container';
import { Media } from '@/components/common/media/media';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetInfoProps = Readonly<{
	car: CarFleet;
}>;

export const CarFleetInfo = ({ car }: CarFleetInfoProps) => (
	<Container className="flex flex-col items-center gap-12 lg:flex-row">
		<Media
			resource={car.media!.info!}
			autoPlay
			muted
			width={395}
			height={700}
			className="rounded-xl"
		/>
		<div className="space-y-8">
			<CarFleetInfoDetails car={car} />
			<CarFleetInfoDescription content={car.description} />
		</div>
	</Container>
);
