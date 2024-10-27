import { AboutUsOverview } from '@/components/about-us/about-us-overview';
import { AboutUsStatistics } from '@/components/about-us/about-us-statistics/about-us-statistics';
import { AboutUsTeam } from '@/components/about-us/about-us-team/about-us-team';
import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PayloadPageHeader } from '@/components/common/payload-page-header';

const AboutUsPage = () => (
	<main>
		<PayloadPageHeader global="about-us-header" />
		<AboutUsOverview />
		<AboutUsStatistics />
		<AboutUsTeam />
		<ContactSection />
	</main>
);

export default AboutUsPage;
