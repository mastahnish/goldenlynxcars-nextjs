import { getCarFleetSectionContent } from './car-fleet-section.content';
import { CarFleetSectionCars } from './car-fleet-section-cars';

import { Section } from '@/components/common/section';
import { Button } from '@/components/ui/button/button';

export const CarFleetSection = async () => {
	const { title, label, cars } = await getCarFleetSectionContent();

	const filteredCars = (cars ?? []).filter(car => typeof car !== 'number');

	return (
		<Section title={title} label={label}>
			<CarFleetSectionCars cars={filteredCars} />
			<div className="mx-auto mt-4 w-fit">
				<Button size="medium">Zobacz pełną flotę</Button>
			</div>
		</Section>
	);
};
