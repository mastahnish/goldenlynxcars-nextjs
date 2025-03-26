import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionSummary = async () => {
	const { summary } = await getCachedGlobal('car-subscription-content')();

	return <p className="text-lg text-white">{summary}</p>;
};
