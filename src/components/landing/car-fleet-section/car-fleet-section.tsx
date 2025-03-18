import Link from 'next/link';

import { CarFleetSectionCars } from './car-fleet-section-cars';

import { Section } from '@/components/common/section';
import { Button } from '@/components/ui/button/button';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarFleetSection = async () => {
	const { title, label, cars } = await getCachedGlobal('car-fleet-section', {
		tags: ['collection_car-fleet'],
	})();

	const filteredCars = (cars ?? []).filter(car => typeof car !== 'number');

	return (
		<Section title={title} label={label}>
			<CarFleetSectionCars cars={filteredCars} />
			<div className="mx-auto mt-4 w-fit">
				<Button size="large" asChild>
					<Link href="/flota-samochodow">Zobacz pełną flotę</Link>
				</Button>
			</div>
		</Section>
	);
};
