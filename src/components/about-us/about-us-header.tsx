import { PageHeader } from '@/components/common/page-header';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const AboutUsHeader = async () => {
	const { title, label, content, subContent } =
		await getCachedGlobal('about-us-header')();

	return (
		<PageHeader
			title={title}
			label={label}
			content={content}
			subContent={subContent}
		/>
	);
};
