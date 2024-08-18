import type { CarFleet } from './car-fleet-card.types';

type CarFleetCardGeneralProps = Readonly<{
	car: CarFleet;
}>;

export const CarFleetCardGeneral = ({ car }: CarFleetCardGeneralProps) => (
	<div className="flex flex-col gap-4 text-white">
		<h3 className="text-xl font-bold">{car.name}</h3>
		<p className="text-lg">Od {car.price}zł/dzień</p>
	</div>
);
