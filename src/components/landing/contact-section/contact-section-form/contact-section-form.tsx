'use client';

import { Controller } from 'react-hook-form';

import { useContactSectionForm } from './use-contact-section-form';

import { Button } from '@/components/ui/button/button';
import { DatePicker } from '@/components/ui/date-picker/date-picker';
import { ArrowRight } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select/select';

import type { CarFleet } from '@/payload/payload-types';

type ContactSectionFormProps = Readonly<{
	cars: CarFleet[];
}>;

export const ContactSectionForm = ({ cars }: ContactSectionFormProps) => {
	const { register, control, errors, onSubmit, selectOptions } =
		useContactSectionForm({
			cars,
		});

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<Input
				type="email"
				placeholder="E-mail"
				isError={!!errors.email}
				fullWidth
				{...register('email')}
			/>
			<Input
				type="text"
				placeholder="Imię"
				isError={!!errors.firstName}
				fullWidth
				{...register('firstName')}
			/>
			<Input
				type="tel"
				placeholder="Numer telefonu"
				isError={!!errors.phoneNumber}
				fullWidth
				{...register('phoneNumber')}
			/>
			<div className="flex gap-5 max-sm:flex-col">
				<Controller
					name="carId"
					control={control}
					render={({ field: { onChange, ...field } }) => (
						<Select
							aria-label="Samochód"
							placeholder="Wybierz samochód"
							options={selectOptions}
							onValueChange={onChange}
							isError={!!errors.carId}
							fullWidth
							{...field}
						/>
					)}
				/>
				<div className="sm:w-64 sm:shrink-0">
					<Controller
						name="date"
						control={control}
						render={({ field: { onChange, ...field } }) => (
							<DatePicker
								fromDate={new Date()}
								onSelect={onChange}
								isError={!!errors.date}
								fullWidth
								{...field}
							/>
						)}
					/>
				</div>
			</div>
			{/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
			<div className="sm:w-[266px]">
				<Button type="submit" icon={ArrowRight} moveIcon fullWidth>
					Wyślij zapytanie
				</Button>
			</div>
		</form>
	);
};
