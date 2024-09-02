'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AboutUsTeamMembersItem } from './about-us-team-members-item';

import type { TeamMember } from '../about-us-team.types';

type AboutUsTeamMembersProps = Readonly<{
	team: TeamMember[];
}>;

export const AboutUsTeamMembers = ({ team }: AboutUsTeamMembersProps) => (
	<Swiper
		modules={[Pagination]}
		spaceBetween={24}
		breakpoints={{
			1024: {
				slidesPerView: 2,
			},
		}}
		loop
		pagination
	>
		{team.map(member => (
			<SwiperSlide key={member.id}>
				<AboutUsTeamMembersItem member={member} />
			</SwiperSlide>
		))}
	</Swiper>
);
