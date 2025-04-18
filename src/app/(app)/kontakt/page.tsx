import { ContactSection } from '@/components/common/contact-section/contact-section';
import { PageHeader } from '@/components/common/page-header';
import { ContactMapSection } from '@/components/contact/contact-map-section';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Kontakt',
};

const ContactPage = () => (
	<>
		<PageHeader global="contact-header" />
		<ContactMapSection />
		<ContactSection />
	</>
);

export default ContactPage;
