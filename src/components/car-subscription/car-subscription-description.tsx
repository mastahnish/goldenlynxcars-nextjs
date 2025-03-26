import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionDescription = async () => {
	const { description } = await getCachedGlobal('car-subscription-content')();

	return <p className="text-lg text-white">{description}</p>;
};
