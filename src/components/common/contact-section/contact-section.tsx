import { ContactSectionForm } from './contact-section-form/contact-section-form';
import { ContactSectionImage } from './contact-section-image';

import { ContactPhoneButton } from '@/components/common/contact-phone-button';
import { Section } from '@/components/common/section';

import { PHONE_NUMBERS } from '@/lib/constants';
import { getCachedCollection } from '@/lib/get-cached-collection';
import { getCachedGlobal } from '@/lib/get-cached-global';

export const ContactSection = async () => {
	const { title, label, image } = await getCachedGlobal('contact-section')();
	const carFleet = await getCachedCollection('car-fleet')();

	return (
		<section className="flex bg-semi-black pb-6">
			<Section
				as="div"
				title={title}
				titleGap="small"
				label={label}
				className="w-full space-y-6"
			>
				<div className="-mt-8 space-x-2">
					{PHONE_NUMBERS.map(phoneNumber => (
						<ContactPhoneButton key={phoneNumber} phoneNumber={phoneNumber} />
					))}
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
