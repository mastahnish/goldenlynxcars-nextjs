import { footerSocials } from '../footer.constants';
import { FooterSocialsItem } from './footer-socials-item';

export const FooterSocials = () => (
	<ul className="flex gap-5 lg:order-1">
		{footerSocials.map(social => (
			<li key={social.href}>
				<FooterSocialsItem social={social} />
			</li>
		))}
	</ul>
);
