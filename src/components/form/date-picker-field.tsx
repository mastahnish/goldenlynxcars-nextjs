import { DatePicker } from '../ui/date-picker/date-picker';
import { FieldWrapper } from './field-wrapper';

import type { ComponentProps } from 'react';

type DatePickerFieldProps = Readonly<{
	error?: string;
}> &
	Omit<ComponentProps<typeof DatePicker>, 'isError'>;

export const DatePickerField = ({
	fullWidth,
	error,
	...props
}: DatePickerFieldProps) => (
	<FieldWrapper fullWidth={fullWidth} error={error}>
		<DatePicker fullWidth={fullWidth} isError={!!error} {...props} />
	</FieldWrapper>
);
