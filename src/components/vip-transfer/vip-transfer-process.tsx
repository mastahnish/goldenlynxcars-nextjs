import { Container } from '../common/container';
import { Media } from '../common/media/media';
import { RichText } from '../common/rich-text';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const VipTransferProcess = async () => {
	const { process } = await getCachedGlobal('vip-transfer-content')();

	return (
		<Container
			as="section"
			className="flex flex-col items-center gap-12 lg:flex-row lg:items-start"
		>
			<div className="relative h-64 w-96 shrink-0 lg:order-1">
				<Media
					resource={process.media}
					fill
					className="rounded-xl object-cover"
				/>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-bold text-white">{process.title}</h2>
				<RichText content={process.content} />
			</div>
		</Container>
	);
};
