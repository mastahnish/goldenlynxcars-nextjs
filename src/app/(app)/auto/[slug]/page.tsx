import config from '@payload-config';
import { getPayload } from 'payload';

import { CarFleetGallerySection } from '@/components/car-fleet/car-fleet-gallery-section/car-fleet-gallery-section';
import { CarFleetInfo } from '@/components/car-fleet/car-fleet-info/car-fleet-info';
import { CarFleetPageHeader } from '@/components/car-fleet/car-fleet-page-header';
import { CarFleetPricingSection } from '@/components/car-fleet/car-fleet-pricing-section/car-fleet-pricing-section';
import { ContactSection } from '@/components/common/contact-section/contact-section';
import { RentalCalculatorForm } from '@/components/rental-calculator/rental-calculator-form/rental-calculator-form';

import type { Params } from '@/types/next.types';

/*
import { getCachedCollection } from '@/lib/get-cached-collection';

export const dynamicParams = false;

export const generateStaticParams = async () => {
	const { docs } = await getCachedCollection('car-fleet')();

	return docs.map(({ id }) => ({
		slug: String(id),
	}));
};

export const generateMetadata = async ({
	params,
}: {
	params: Params<'slug'>;
}) => {
	const { slug } = await params;
	const payload = await getPayload({ config });
	const {
		docs: [car],
	} = await payload.find({
		collection: 'car-fleet',
		where: {
			slug: { equals: slug },
		},
	});

	return {
		title: `Auto | ${car.name}`,
	};
}; */

type CarPageProps = Readonly<{
	params: Params<'slug'>;
}>;

const CarPage = async ({ params }: CarPageProps) => {
	const { slug } = await params;
	const payload = await getPayload({ config });
	const {
		docs: [car],
	} = await payload.find({
		collection: 'car-fleet',
		where: {
			slug: { equals: slug },
		},
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
