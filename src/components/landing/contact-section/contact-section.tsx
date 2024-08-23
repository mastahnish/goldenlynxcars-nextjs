import { getContactSectionContent } from './contact-section.content';
import { ContactSectionForm } from './contact-section-form/contact-section-form';
import { ContactSectionImage } from './contact-section-image';

import { ContactPhoneButton } from '@/components/common/contact-phone-button';
import { Section } from '@/components/common/section';

export const ContactSection = async () => {
	const { title, label, image, carFleet } = await getContactSectionContent();

	return (
		<section className="flex bg-semi-black">
			<Section
				as="div"
				title={`${title}${Date.now()}`}
				titleGap="small"
				label={label}
				className="w-full space-y-6"
			>
				<div className="-mt-8">
					<ContactPhoneButton />
				</div>
				<p className="text-lg text-neutral-300">
					lub <span className="font-bold text-white">wyślij e-mail</span>,
					oddzwonimy w ciągu godziny
				</p>
				<ContactSectionForm cars={carFleet.docs} />
			</Section>
			<ContactSectionImage resource={image} />
		</section>
	);
};
