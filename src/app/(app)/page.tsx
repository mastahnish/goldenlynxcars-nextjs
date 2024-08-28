import { CarFleetSection } from '@/components/landing/car-fleet-section/car-fleet-section';
import { ContactSection } from '@/components/landing/contact-section/contact-section';
import { FAQSection } from '@/components/landing/faq-section/faq-section';
import { Hero } from '@/components/landing/hero/hero';
import { OpinionSection } from '@/components/landing/opinion-section/opinion-section';
import { RealizationsSection } from '@/components/landing/realizations-section/realizations-section';
import { ServicesSection } from '@/components/landing/services-section/services-section';

const IndexPage = () => (
	<>
		<Hero />
		<ServicesSection />
		<CarFleetSection />
		<OpinionSection />
		<RealizationsSection />
		<FAQSection />
		<ContactSection />
	</>
);

export default IndexPage;
