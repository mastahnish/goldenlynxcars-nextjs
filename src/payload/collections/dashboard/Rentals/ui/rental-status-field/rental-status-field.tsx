'use client';

/* eslint-disable tailwindcss/no-custom-classname */

import { useField } from '@payloadcms/ui';

import { getRentalStatus } from './rental-status-field.utils';

export const RentalStatusField = () => {
	const { value: startDateValue } = useField<string>({ path: 'startDate' });
	const { value: endDateValue } = useField<string>({ path: 'endDate' });

	const status = getRentalStatus(startDateValue, endDateValue);

	if (!status) {
		return null;
	}

	return (
		<div className="field-type">
			<p>
				Status:{' '}
				<span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
					{status}
				</span>
			</p>
		</div>
	);
};
