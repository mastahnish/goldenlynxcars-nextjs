import { Container } from '@/components/common/container';
import { PageHeader } from '@/components/common/page-header';
import { InvestorModelContactSection } from '@/components/investor-model/investor-model-contact-section/investor-model-contact-section';
import { InvestorModelDescription } from '@/components/investor-model/investor-model-description';
import { InvestorModelStepList } from '@/components/investor-model/investor-model-step-list/investor-model-step-list';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Model Inwestorski',
};

const InvestorModelPage = () => (
	<>
		<PageHeader global="investor-model-header" />
		<Container as="main" className="space-y-8 md:space-y-4">
			<InvestorModelDescription />
			<InvestorModelStepList />
		</Container>
		<InvestorModelContactSection />
	</>
);

export default InvestorModelPage;
