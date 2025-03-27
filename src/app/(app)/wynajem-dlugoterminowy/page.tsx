import { Container } from '@/components/common/container';
import { PageHeader } from '@/components/common/page-header';
import { LongTermRentalAdditionalInformation } from '@/components/long-term-rental/long-term-rental-additional-information/long-term-rental-additional-information';
import { LongTermRentalProcess } from '@/components/long-term-rental/long-term-rental-process/long-term-rental-process';
import { LongTermRentalSummary } from '@/components/long-term-rental/long-term-rental-summary';

const LongTermRentalPage = () => (
	<>
		<PageHeader global="long-term-rental-header" />
		<Container as="main" className="space-y-8 md:space-y-4">
			<LongTermRentalProcess />
			<LongTermRentalAdditionalInformation />
			<LongTermRentalSummary />
		</Container>
	</>
);

export default LongTermRentalPage;
