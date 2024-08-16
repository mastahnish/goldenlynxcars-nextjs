import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';

export const ServicesSectionListItemContentFindOutMore = () => (
	<Link
		href="#"
		className="group flex w-fit items-center gap-1.5 font-semibold text-primary"
	>
		Dowiedz się wiecej{' '}
		<GoArrowRight
			size={26}
			className="transition-transform duration-300 group-hover:translate-x-0.5"
		/>
	</Link>
);
