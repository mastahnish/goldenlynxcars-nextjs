import Link from 'next/link';

import type { FooterSection } from '../footer.constants';

type FooterSectionItemsPros = Readonly<{
	items: FooterSection['items'];
}>;

export const FooterSectionItems = ({ items }: FooterSectionItemsPros) => (
	<ul className="space-y-4">
		{items.map(({ href, label }) => (
			<li key={label}>
				<Link href={href} className="text-lg text-neutral-300">
					{label}
				</Link>
			</li>
		))}
	</ul>
);
