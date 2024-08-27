import { FooterRights } from '../footer-rights';
import { footerSections } from './footer.constants';
import { FooterSection } from './footer-section/footer-section';
import { FooterSocials } from './footer-socials/footer-socials';

import { Container } from '@/components/common/container';

import Logo from '@/assets/svg/logo.svg';

export const Footer = () => (
	<footer>
		<Container className="flex flex-col gap-7 max-lg:pb-0 lg:flex-row lg:justify-between lg:gap-0">
			<Logo />
			{footerSections.map(section => (
				<FooterSection key={section.title} section={section} />
			))}
		</Container>
		<div className="lg:bg-semi-black">
			<Container className="flex flex-col gap-7 max-lg:pt-7 lg:flex-row lg:items-center lg:justify-between">
				<FooterSocials />
				<FooterRights />
			</Container>
		</div>
	</footer>
);
