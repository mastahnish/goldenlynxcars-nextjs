'use client';

import { Controller } from 'react-hook-form';

import { useInvestorModelContactSectionForm } from './use-investor-model-contact-section-form';

import { SelectField } from '@/components/form/select-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

export const InvestorModelContactSectionForm = () => {
	const { register, errors, control, driveTypeOptions, onSubmit } =
		useInvestorModelContactSectionForm();

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<TextField
				type="email"
				placeholder="E-mail"
				error={errors.email?.message}
				fullWidth
				{...register('email')}
			/>
			<TextField
				type="text"
				placeholder="Imię"
				error={errors.firstName?.message}
				fullWidth
				{...register('firstName')}
			/>
			<TextField
				type="tel"
				placeholder="Numer telefonu"
				error={errors.phoneNumber?.message}
				fullWidth
				{...register('phoneNumber')}
			/>
			<div className="flex gap-5">
				<TextField
					type="text"
					placeholder="Marka"
					error={errors.brand?.message}
					fullWidth
					{...register('brand')}
				/>
				<TextField
					type="text"
					placeholder="Model"
					error={errors.model?.message}
					fullWidth
					{...register('model')}
				/>
				<TextField
					type="number"
					placeholder="Rocznik"
					error={errors.year?.message}
					fullWidth
					{...register('year')}
				/>
			</div>
			<div className="flex gap-5">
				<TextField
					type="number"
					placeholder="Przebieg (km)"
					error={errors.mileage?.message}
					fullWidth
					{...register('mileage')}
				/>
				<Controller
					name="drive"
					control={control}
					render={({ field: { onChange, ...field } }) => (
						<SelectField
							placeholder="Napęd"
							options={driveTypeOptions}
							onValueChange={onChange}
							error={errors.drive?.message}
							fullWidth
							{...field}
						/>
					)}
				/>
			</div>
			<div className="flex gap-5">
				<TextField
					type="text"
					placeholder="Silnik"
					error={errors.engine?.message}
					fullWidth
					{...register('engine')}
				/>
				<TextField
					type="number"
					placeholder="Moc silnika (KM)"
					error={errors.power?.message}
					fullWidth
					{...register('power')}
				/>
			</div>
			<div className="sm:w-fit">
				<Button type="submit" icon={ArrowRight} moveIcon fullWidth>
					Wyślij zgłoszenie
				</Button>
			</div>
		</form>
	);
};
