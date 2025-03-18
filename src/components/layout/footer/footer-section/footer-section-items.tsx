import Link from 'next/link';

import type { FooterSection } from '../footer.constants';

type FooterSectionItemsPros = Readonly<{
	items: FooterSection['items'];
}>;

export const FooterSectionItems = ({ items }: FooterSectionItemsPros) => (
	<ul className="space-y-4">
		{items.map(({ href, label }) => (
			<li key={label}>
				<Link
					href={href}
					className="relative text-lg text-neutral-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-neutral-300 after:transition-width after:duration-500 hover:after:w-full"
				>
					{label}
				</Link>
			</li>
		))}
	</ul>
);
