import { AboutUsTeamMembers } from './about-us-team-members/about-us-team-members';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const AboutUsTeam = async () => {
	const { title, label, team } = await getCachedGlobal('about-us-team')();

	return (
		<Section title={title} label={label}>
			<AboutUsTeamMembers team={team} />
		</Section>
	);
};
