import { Container } from '../common/container';
import { Media } from '../common/media/media';
import { RichText } from '../common/rich-text';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const VipTransferService = async () => {
	const { serviceDescription } = await getCachedGlobal(
		'vip-transfer-content',
	)();

	return (
		<Container
			as="section"
			className="flex flex-col items-center gap-12 lg:flex-row lg:items-start"
		>
			<div className="space-y-4 lg:order-1">
				<h2 className="text-2xl font-bold text-white">
					{serviceDescription.title}
				</h2>
				<RichText content={serviceDescription.content} />
			</div>
			<Media
				resource={serviceDescription.media}
				autoPlay
				muted
				width={339}
				height={600}
				className="rounded-xl"
			/>
		</Container>
	);
};
