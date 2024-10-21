import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

import { CarFleetGallerySection } from '@/components/car-fleet/car-fleet-gallery-section/car-fleet-gallery-section';
import { CarFleetInfo } from '@/components/car-fleet/car-fleet-info/car-fleet-info';
import { CarFleetPageHeader } from '@/components/car-fleet/car-fleet-page-header';
import { CarFleetPricingSection } from '@/components/car-fleet/car-fleet-pricing-section/car-fleet-pricing-section';
import { ContactSection } from '@/components/common/contact-section/contact-section';
import { RentalCalculatorForm } from '@/components/rental-calculator/rental-calculator-form/rental-calculator-form';

// import { getCachedCollection } from '@/lib/get-cached-collection';
import type { Params } from '@/types/next.types';

/* export const dynamicParams = false;

export const generateStaticParams = async () => {
	const { docs } = await getCachedCollection('car-fleet')();

	return docs.map(({ id }) => ({
		slug: String(id),
	}));
}; */

type CarPageProps = Readonly<{
	params: Params<'slug'>;
}>;

const CarPage = async ({ params: { slug } }: CarPageProps) => {
	const payload = await getPayloadHMR({ config });
	const car = await payload.findByID({
		collection: 'car-fleet',
		id: slug,
	});

	return (
		<>
			<CarFleetPageHeader car={car} />
			<CarFleetInfo car={car} />
			<RentalCalculatorForm
				title="Wyceń swój wynajem"
				defaultCarId={String(car.id)}
				cars={[car]}
			/>
			<CarFleetGallerySection car={car} />
			<CarFleetPricingSection prices={car.prices} deposit={car.deposit} />
			<ContactSection />
		</>
	);
};

export default CarPage;
