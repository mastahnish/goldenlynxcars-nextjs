import type { FooterSocial } from '../footer.constants';

type FooterSocialsItemProps = Readonly<{
	social: FooterSocial;
}>;

export const FooterSocialsItem = ({
	social: { href, icon: Icon },
}: FooterSocialsItemProps) => (
	<a href={href} target="_blank">
		<Icon size={28} className="text-neutral-300" />
	</a>
);
