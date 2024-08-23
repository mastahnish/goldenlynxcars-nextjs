import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { UseFormProps } from 'react-hook-form';
import type { Schema, TypeOf } from 'zod';

export const useZodForm = <TSchema extends Schema>(
	schema: TSchema,
	options?: Omit<UseFormProps<TypeOf<TSchema>>, 'resolver'>,
) => {
	const form = useForm({
		resolver: zodResolver(schema),
		...options,
	});

	return form;
};
