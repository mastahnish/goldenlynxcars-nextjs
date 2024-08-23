import { toast } from 'react-hot-toast';

import { contactSectionFormSchema } from './contact-section-form.schema';

import { addContactRequest } from '@/actions/contact';
import { useZodForm } from '@/hooks/use-zod-form';

import type { CarFleet } from '@/payload/payload-types';

interface UseContactSectionFormInput {
	cars: CarFleet[];
}

export const useContactSectionForm = ({ cars }: UseContactSectionFormInput) => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useZodForm(contactSectionFormSchema);

	const selectOptions = cars.map(({ id, name }) => ({
		value: id.toString(),
		label: name,
	}));

	const onSubmit = handleSubmit(data => {
		reset();
		setValue('carId', '');

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		toast.promise(addContactRequest({ ...data }), {
			loading: 'Wysyłanie...',
			success: 'Wysłano',
			error: 'Ups, coś poszło nie tak!',
		});
	});

	return { register, control, errors, onSubmit, selectOptions };
};
