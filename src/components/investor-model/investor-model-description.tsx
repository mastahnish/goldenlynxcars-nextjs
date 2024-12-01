import { Media } from '../common/media/media';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const InvestorModelDescription = async () => {
	const { description, media } = await getCachedGlobal(
		'investor-model-content',
	)();

	return (
		<div className="flex items-center gap-12">
			<p className="text-lg text-white">{description}</p>
			<Media
				resource={media}
				width={283}
				height={500}
				className="hidden rounded-xl object-cover md:block"
			/>
		</div>
	);
};
