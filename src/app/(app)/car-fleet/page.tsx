import { CarFleetList } from '@/components/car-fleet/car-fleet-list/car-fleet-list';
import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';

import { getCachedCollection } from '@/lib/get-cached-collection';

const CarFleetPage = async () => {
	const carFleet = await getCachedCollection('car-fleet')();

	return (
		<main>
			<PageHeader global="car-fleet-header" />
			<CarFleetList cars={carFleet.docs} />
			<ContactSection />
		</main>
	);
};

export default CarFleetPage;
