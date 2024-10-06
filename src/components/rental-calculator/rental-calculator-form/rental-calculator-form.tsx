'use client';

import { addDays } from 'date-fns';
import { Controller } from 'react-hook-form';

import { Container } from '../../common/container';
import { Checkbox } from '../../ui/checkbox/checkbox';
import { DEFAULT_ADDRESS } from './rental-calculator-form.constants';
import { useRentalCalculatorForm } from './use-rental-calculator-form';

import { DatePickerField } from '@/components/form/date-picker-field';
import { LocationSelectField } from '@/components/form/location-select-field';
import { SelectField } from '@/components/form/select-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { CarFleet } from '@/payload/payload-types';

type RentalCalculatorFormProps = Readonly<{
	cars: CarFleet[];
}>;

export const RentalCalculatorForm = ({ cars }: RentalCalculatorFormProps) => {
	const {
		register,
		onSubmit,
		control,
		errors,
		diffCollectionAndReturnAddress,
		selectOptions,
		startDate,
		price,
	} = useRentalCalculatorForm({
		cars,
	});

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<div className="flex flex-col gap-4">
					<Controller
						name="carId"
						control={control}
						render={({ field: { onChange, ...field } }) => (
							<SelectField
								aria-label="Samochód"
								placeholder="Wybierz samochód"
								options={selectOptions}
								onValueChange={onChange}
								error={errors.carId?.message}
								fullWidth
								{...field}
							/>
						)}
					/>
					<div className="flex w-full flex-col gap-4 md:flex-row">
						<Controller
							name="startDate"
							control={control}
							render={({ field: { onChange, ...field } }) => (
								<DatePickerField
									label="Data Odbioru"
									fromDate={new Date()}
									onSelect={onChange}
									error={errors.startDate?.message}
									fullWidth
									{...field}
								/>
							)}
						/>
						<Controller
							name="endDate"
							control={control}
							render={({ field: { onChange, ...field } }) => (
								<DatePickerField
									label="Data Zwrotu"
									fromDate={addDays(startDate, 1)}
									onSelect={onChange}
									error={errors.endDate?.message}
									fullWidth
									{...field}
								/>
							)}
						/>
					</div>
					<div className="flex flex-col gap-4 md:flex-row">
						<div className="flex w-full flex-col gap-4">
							{diffCollectionAndReturnAddress ? (
								<>
									<Controller
										name="collectionAddress"
										control={control}
										render={({ field: { onChange, ...field } }) => (
											<LocationSelectField
												placeholder="Miejsce odbioru"
												defaultPlaces={[DEFAULT_ADDRESS]}
												onValueChange={onChange}
												error={errors.collectionAddress?.message}
												{...field}
											/>
										)}
									/>
									<Controller
										name="returnAddress"
										control={control}
										render={({ field: { onChange, ...field } }) => (
											<LocationSelectField
												placeholder="Miejsce zwrotu"
												defaultPlaces={[DEFAULT_ADDRESS]}
												onValueChange={onChange}
												error={errors.returnAddress?.message}
												{...field}
											/>
										)}
									/>
								</>
							) : (
								<Controller
									name="collectionAndReturnAddress"
									control={control}
									render={({ field: { onChange, ...field } }) => (
										<LocationSelectField
											placeholder="Miejsce odbioru i zwrotu"
											defaultPlaces={[DEFAULT_ADDRESS]}
											onValueChange={onChange}
											error={errors.collectionAndReturnAddress?.message}
											{...field}
										/>
									)}
								/>
							)}
							<TextField
								type="number"
								placeholder="Wiek wynajmującego"
								error={errors.age?.message}
								fullWidth
								{...register('age')}
							/>
							<TextField
								type="email"
								placeholder="E-mail"
								error={errors.email?.message}
								fullWidth
								{...register('email')}
							/>
							<TextField
								type="tel"
								placeholder="Numer telefonu"
								error={errors.phoneNumber?.message}
								fullWidth
								{...register('phoneNumber')}
							/>
						</div>
						<div className="mt-3 md:mt-0">
							<Controller
								name="diffCollectionAndReturnAddress"
								control={control}
								render={({ field: { onChange, ...field } }) => (
									<Checkbox
										label="Miejsce odbioru inne niż zwrotu"
										onCheckedChange={onChange}
										{...field}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<h3 className="mt-4 text-2xl font-bold text-white">Twoja cena:</h3>
				<p className="mb-8 mt-2 text-5xl font-bold text-primary">
					{Math.round(price)}zł{' '}
					<span className="text-2xl font-semibold">brutto</span>
				</p>
				<Button type="submit" icon={ArrowRight} moveIcon>
					Wyślij zapytanie
				</Button>
			</form>
		</Container>
	);
};
