import { AboutUsOverview } from '@/components/about-us/about-us-overview';
import { AboutUsStatistics } from '@/components/about-us/about-us-statistics/about-us-statistics';
import { AboutUsTeam } from '@/components/about-us/about-us-team/about-us-team';
import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'O Nas',
};

const AboutUsPage = () => (
	<main>
		<PageHeader global="about-us-header" />
		<AboutUsOverview />
		<AboutUsStatistics />
		<AboutUsTeam />
		<ContactSection />
	</main>
);

export default AboutUsPage;
