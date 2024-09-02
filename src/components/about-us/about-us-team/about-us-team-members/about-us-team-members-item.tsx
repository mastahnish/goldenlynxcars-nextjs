import { Media } from '@/components/common/media/media';

import type { TeamMember } from '../about-us-team.types';

type AboutUsTeamMembersItemProps = Readonly<{
	member: TeamMember;
}>;

export const AboutUsTeamMembersItem = ({
	member,
}: AboutUsTeamMembersItemProps) => (
	<article className="mx-auto flex max-w-team-card gap-6 rounded-2xl border border-primary/10 bg-semi-black p-4 max-xs:flex-col">
		<Media
			resource={member.image}
			width={200}
			height={300}
			className="mx-auto h-48 w-36 self-start rounded-xl object-cover xs:mx-0"
		/>
		<div className="space-y-3 text-white">
			<p className="text-3xl font-semibold">{member.firstName}</p>
			<p className="text-sm">{member.description}</p>
		</div>
	</article>
);
