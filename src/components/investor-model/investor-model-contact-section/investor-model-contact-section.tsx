import { InvestorModelContactSectionForm } from './investor-model-contact-section-form/investor-model-contact-section-form';
import { InvestorModelContactSectionImage } from './investor-model-contact-section-image';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const InvestorModelContactSection = async () => {
	const { image } = await getCachedGlobal('contact-section')();

	return (
		<section className="flex bg-semi-black pb-6">
			<Section
				as="div"
				title="Wyślij zgłoszenie"
				titleGap="small"
				label="Zgłoszenie"
				className="w-full space-y-6"
			>
				<p className="text-lg text-neutral-300">
					wyślij e-mail w sprawie dodania auta do floty
				</p>
				<InvestorModelContactSectionForm />
			</Section>
			<InvestorModelContactSectionImage resource={image} />
		</section>
	);
};
