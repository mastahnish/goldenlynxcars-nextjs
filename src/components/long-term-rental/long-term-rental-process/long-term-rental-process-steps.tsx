import { getCachedGlobal } from '@/lib/get-cached-global';

export const LongTermRentalProcessSteps = async () => {
	const { process } = await getCachedGlobal('long-term-rental-content')();

	return (
		<ol className="list-decimal space-y-6">
			{process.steps.map(({ id, content }) => {
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
		</ol>
	);
};
