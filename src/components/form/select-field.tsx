import { Select } from '../ui/select/select';
import { FieldWrapper } from './field-wrapper';

import type { ComponentProps } from 'react';

type SelectFieldProps = Readonly<{
	error?: string;
}> &
	Omit<ComponentProps<typeof Select>, 'isError'>;

export const SelectField = ({
	fullWidth,
	error,
	...props
}: SelectFieldProps) => (
	<FieldWrapper fullWidth={fullWidth} error={error}>
		<Select fullWidth={fullWidth} isError={!!error} {...props} />
	</FieldWrapper>
);
