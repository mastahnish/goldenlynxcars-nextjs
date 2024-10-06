import { FieldWrapper } from './field-wrapper';
import { LocationSelect } from './location-select/location-select';

import type { ComponentProps } from 'react';

type LocationSelectFieldProps = Readonly<{
	error?: string;
}> &
	Omit<ComponentProps<typeof LocationSelect>, 'isError'>;

export const LocationSelectField = ({
	error,
	...props
}: LocationSelectFieldProps) => (
	<FieldWrapper fullWidth error={error}>
		<LocationSelect isError={!!error} {...props} />
	</FieldWrapper>
);
