'use client';

/* eslint-disable tailwindcss/no-custom-classname */

import { useField } from '@payloadcms/ui';

import { getRentalStatus } from './rental-state-field.utils';

const RentalStateField = () => {
	const { value: startDateValue } = useField<string>({ path: 'startDate' });
	const { value: endDateValue } = useField<string>({ path: 'endDate' });

	const status = getRentalStatus(startDateValue, endDateValue);

	if (!status) {
		return null;
	}

	return (
		<div className="field-type">
			<p>
				State:{' '}
				<span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
					{status}
				</span>
			</p>
		</div>
	);
};

export default RentalStateField;
