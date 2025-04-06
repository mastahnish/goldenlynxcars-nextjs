import { FooterSectionItems } from './footer-section-items';

import type { FooterSection as FooterSectionType } from '../footer.constants';

type FooterSectionProps = Readonly<{
	section: FooterSectionType;
}>;

export const FooterSection = ({
	section: { title, items },
}: FooterSectionProps) => (
	<section>
		<h3 className="mb-5 text-lg text-white sm:text-xl">{title}</h3>
		<FooterSectionItems items={items} />
	</section>
);
