import { AboutUsHeader } from '@/components/about-us/about-us-header';
import { AboutUsStatistics } from '@/components/about-us/about-us-statistics/about-us-statistics';
import { AboutUsTeam } from '@/components/about-us/about-us-team/about-us-team';

const AboutUsPage = () => (
	<main>
		<AboutUsHeader />
		<AboutUsStatistics />
		<AboutUsTeam />
	</main>
);

export default AboutUsPage;
