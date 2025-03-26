import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionBenefitsList = async () => {
	const { benefits } = await getCachedGlobal('car-subscription-content')();

	return (
		<ul className="list-disc space-y-4">
			{benefits.list.map(({ id, content }) => {
				const splittedContent = content.split(':');

				return (
					<li key={id} className="text-lg text-white xs:text-xl">
						<span className="font-semibold underline">
							{splittedContent[0]}
						</span>
						:{splittedContent[1]}
					</li>
				);
			})}
		</ul>
	);
};
