import { CarFleetSection } from '@/components/landing/car-fleet-section/car-fleet-section';
import { FAQSection } from '@/components/landing/faq-section/faq-section';
import { Hero } from '@/components/landing/hero/hero';
import { OpinionSection } from '@/components/landing/opinion-section/opinion-section';
import { ServicesSection } from '@/components/landing/services-section/services-section';

const IndexPage = () => (
	<>
		<Hero />
		<ServicesSection />
		<CarFleetSection />
		<OpinionSection />
		<FAQSection />
	</>
);

export default IndexPage;
