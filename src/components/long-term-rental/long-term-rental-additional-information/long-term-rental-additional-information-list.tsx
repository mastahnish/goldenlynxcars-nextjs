import { getCachedGlobal } from '@/lib/get-cached-global';

export const LongTermRentalAdditionalInformationList = async () => {
	const { additionalInformation } = await getCachedGlobal(
		'long-term-rental-content',
	)();

	return (
		<ul className="list-decimal space-y-6">
			{additionalInformation.informations.map(({ id, content }) => {
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
