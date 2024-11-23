import { Container } from '../common/container';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const VipTransferWhyWorth = async () => {
	const { whyWorth } = await getCachedGlobal('vip-transfer-content')();

	return (
		<Container as="section" className="space-y-4 text-white">
			<h2 className="text-2xl font-bold">{whyWorth.title}</h2>
			<p className="text-lg">{whyWorth.description}</p>
			<ul className="space-y-4 text-lg">
				{whyWorth.needments.map(({ id, content }) => (
					<li
						key={id}
						className="flex items-center gap-2 before:block before:size-5 before:bg-checkmark"
					>
						{content}
					</li>
				))}
			</ul>
		</Container>
	);
};
