import { PageHeader } from './page-header';

import { getCachedGlobal } from '@/lib/get-cached-global';

type PayloadPageHeaderProps = Readonly<{
	global: 'about-us-header' | 'car-fleet-header' | 'rental-calculator-header';
}>;

export const PayloadPageHeader = async ({ global }: PayloadPageHeaderProps) => {
	const { title, label, content, subContent } = await getCachedGlobal(global)();

	return (
		<PageHeader
			title={title}
			label={label}
			content={content}
			subContent={subContent}
		/>
	);
};
