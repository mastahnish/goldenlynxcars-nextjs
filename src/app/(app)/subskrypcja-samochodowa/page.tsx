import { CarSubscriptionBenefits } from '@/components/car-subscription/car-subscription-benefits/car-subscription-benefits';
import { CarSubscriptionChooseReasons } from '@/components/car-subscription/car-subscription-choose-reasons/car-subscription-choose-reasons';
import { CarSubscriptionComparison } from '@/components/car-subscription/car-subscription-comparison/car-subscription-comparison';
import { CarSubscriptionDescription } from '@/components/car-subscription/car-subscription-description';
import { CarSubscriptionSummary } from '@/components/car-subscription/car-subscription-summary';
import { Container } from '@/components/common/container';
import { PageHeader } from '@/components/common/page-header';

const CarSubscriptionPage = () => (
	<>
		<PageHeader global="car-subscription-header" />
		<Container as="main" className="space-y-8 md:space-y-4">
			<CarSubscriptionDescription />
			<CarSubscriptionBenefits />
			<CarSubscriptionComparison />
			<CarSubscriptionChooseReasons />
			<CarSubscriptionSummary />
		</Container>
	</>
);

export default CarSubscriptionPage;
