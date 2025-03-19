'use client';

import { addDays } from 'date-fns';
import { Controller } from 'react-hook-form';

import { Container } from '../../common/container';
import { Checkbox } from '../../ui/checkbox/checkbox';
import { DEFAULT_ADDRESS } from './rental-calculator-form.constants';
import { RentalCalculatorFormInfo } from './rental-calculator-form-info';
import { useRentalCalculatorForm } from './use-rental-calculator-form';

import { Media } from '@/components/common/media/media';
import { DatePickerField } from '@/components/form/date-picker-field';
import { LocationSelectField } from '@/components/form/location-select-field';
import { SelectField } from '@/components/form/select-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';
import { Slider } from '@/components/ui/slider';

import type { CarFleet } from '@/payload/payload-types';

type RentalCalculatorFormProps = Readonly<{
	title?: string;
	defaultCarId?: string;
	cars: CarFleet[];
}>;

export const RentalCalculatorForm = ({
	title,
	defaultCarId,
	cars,
}: RentalCalculatorFormProps) => {
	const {
		register,
		onSubmit,
		control,
		errors,
		car,
		isLoading,
		diffCollectionAndReturnAddress,
		biggerMileageLimit,
		selectOptions,
		startDate,
		price,
		deposit,
		mileageLimit,
		additionalMileageLimit,
	} = useRentalCalculatorForm({
		defaultCarId,
		cars,
	});

	return (
		<Container>
			<form onSubmit={onSubmit} className="flex flex-col lg:flex-row lg:gap-16">
				<div className="flex w-full flex-col gap-5">
					{title && (
						<h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
					)}
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
					<div className="flex w-full flex-col gap-5 md:flex-row">
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
					<div className="flex flex-col gap-5 md:flex-row">
						<div className="flex w-full flex-col gap-5">
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
					<Controller
						name="biggerMileageLimit"
						control={control}
						render={({ field: { onChange, ...field } }) => (
							<Checkbox
								label="Potrzebuję dodatkowego limitu kilometrów"
								onCheckedChange={onChange}
								{...field}
							/>
						)}
					/>
					{biggerMileageLimit && (
						<>
							<Controller
								name="additionalMileageLimit"
								control={control}
								render={({ field: { onChange, ...field } }) => (
									<Slider
										step={10}
										max={5 * mileageLimit}
										onValueChange={onChange}
										className="mt-2"
										{...field}
									/>
								)}
							/>
						</>
					)}
				</div>
				<div className="space-y-5">
					<div className="relative hidden size-72 overflow-hidden rounded-xl lg:block">
						{car?.media?.rentalPrice && (
							<Media
								resource={car.media.rentalPrice}
								fill
								className="object-cover"
							/>
						)}
					</div>
					<RentalCalculatorFormInfo
						title="Twoja cena:"
						content={isLoading ? '...' : Math.round(price)}
						suffix="zł"
					/>
					<RentalCalculatorFormInfo
						title="Kaucja"
						content={deposit}
						suffix="zł"
						size="sm"
					/>
					<RentalCalculatorFormInfo
						title="Limit kilometrów:"
						content={mileageLimit + additionalMileageLimit}
						suffix="km"
						size="sm"
					/>
					<div className="w-full sm:w-fit lg:w-full">
						<Button type="submit" icon={ArrowRight} moveIcon fullWidth>
							Wyślij zapytanie
						</Button>
					</div>
				</div>
			</form>
		</Container>
	);
};
