import { InvestorModelStepListItem } from './investor-model-step-list-item';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const InvestorModelStepList = async () => {
	const { steps } = await getCachedGlobal('investor-model-content')();

	return (
		<dl className="space-y-8">
			{steps.map(({ id, title, content }, i) => (
				<InvestorModelStepListItem
					key={id}
					index={i}
					title={title}
					content={content}
				/>
			))}
		</dl>
	);
};
