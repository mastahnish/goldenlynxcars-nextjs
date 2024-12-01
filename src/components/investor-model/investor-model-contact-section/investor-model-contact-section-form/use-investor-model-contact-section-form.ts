import { toast } from 'react-hot-toast';

import { investorModelContactSectionFormSchema } from './investor-model-contact-section-form.schema';
import { getDriveTypeOptions } from './investor-model-contact-section-form.utils';

import { sendInvestorModelRequest } from '@/actions/investor-model';
import { useZodForm } from '@/hooks/use-zod-form';

export const useInvestorModelContactSectionForm = () => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useZodForm(investorModelContactSectionFormSchema);

	const driveTypeOptions = getDriveTypeOptions();

	const onSubmit = handleSubmit(data => {
		reset();
		setValue('drive', '');

		const sendInvestorModelRequestPromise = sendInvestorModelRequest({
			...data,
		});

		void toast.promise(sendInvestorModelRequestPromise, {
			loading: 'Wysyłanie...',
			success: 'Wysłano',
			error: 'Ups, coś poszło nie tak!',
		});
	});

	return { register, control, errors, driveTypeOptions, onSubmit };
};
