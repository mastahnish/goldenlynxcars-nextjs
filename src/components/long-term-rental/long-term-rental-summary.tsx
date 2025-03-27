import { getCachedGlobal } from '@/lib/get-cached-global';

export const LongTermRentalSummary = async () => {
	const { summary } = await getCachedGlobal('long-term-rental-content')();

	return <p className="text-lg text-white">{summary}</p>;
};
