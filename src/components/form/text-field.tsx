import { FieldWrapper } from './field-wrapper';

import { Input } from '@/components/ui/input';

import type { ComponentProps } from 'react';

type TextFieldProps = Readonly<{
	error?: string;
}> &
	Omit<ComponentProps<typeof Input>, 'isError'>;

export const TextField = ({ fullWidth, error, ...props }: TextFieldProps) => (
	<FieldWrapper fullWidth={fullWidth} error={error}>
		<Input fullWidth={fullWidth} isError={!!error} {...props} />
	</FieldWrapper>
);
