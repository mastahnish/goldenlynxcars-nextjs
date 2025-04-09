import { PageHeader } from '@/components/common/page-header';
import { RentalCalculatorForm } from '@/components/rental-calculator/rental-calculator-form/rental-calculator-form';

import { getCachedCollection } from '@/lib/get-cached-collection';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Kalkulator Najmu',
};

const RentalCalculatorPage = async () => {
	const carFleet = await getCachedCollection('car-fleet')();

	return (
		<>
			<PageHeader global="rental-calculator-header" />
			<RentalCalculatorForm cars={carFleet.docs} />
		</>
	);
};

export default RentalCalculatorPage;
