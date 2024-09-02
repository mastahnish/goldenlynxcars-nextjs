import { Container } from '@/components/common/container';
import { Media } from '@/components/common/media/media';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const AboutUsOverview = async () => {
	const { video, title, subTitle, content } =
		await getCachedGlobal('about-us-overview')();

	return (
		<Container
			as="section"
			className="flex gap-12 max-lg:flex-col lg:justify-between xl:gap-24"
		>
			<div className="relative aspect-square w-full">
				<Media
					resource={video}
					className="absolute size-full rounded-2xl object-cover"
				/>
			</div>
			<div className="w-full max-w-xl shrink-0 space-y-5 text-white">
				<h2 className="text-3xl font-bold">{title}</h2>
				<p className="text-lg font-semibold">{subTitle}</p>
				<p className="text-lg">{content}</p>
			</div>
		</Container>
	);
};
