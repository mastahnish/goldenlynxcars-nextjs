import { CarFleetInfoDetailsStatistics } from './car-fleet-info-details-statistics/car-fleet-info-details-statistics';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetInfoDetailsProps = Readonly<{
	car: CarFleet;
}>;

export const CarFleetInfoDetails = ({ car }: CarFleetInfoDetailsProps) => (
	<article className="space-y-4 rounded-2xl border border-primary/10 bg-semi-black p-6 text-white">
		<h2 className="text-2xl font-bold">{car.name}</h2>
		<p className="mb-2 text-2xl">Cena od {car.prices.d_1_2}zł/dzień</p>
		<CarFleetInfoDetailsStatistics details={car.details} />
	</article>
);
