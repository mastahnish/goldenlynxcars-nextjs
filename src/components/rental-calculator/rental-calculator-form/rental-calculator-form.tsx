'use client';

import { Controller } from 'react-hook-form';

import { Container } from '../../common/container';
import { Checkbox } from '../../ui/checkbox/checkbox';
import { DatePicker } from '../../ui/date-picker/date-picker';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select/select';
import { DEFAULT_ADDRESS } from './rental-calculator-form.constants';
import { useRentalCalculatorForm } from './use-rental-calculator-form';

import { LocationSelect } from '@/components/form/location-select/location-select';
import { Button } from '@/components/ui/button/button';
import { ArrowRight } from '@/components/ui/icons';

import type { CarFleet } from '@/payload/payload-types';

type RentalCalculatorFormProps = Readonly<{
	cars: CarFleet[];
}>;

export const RentalCalculatorForm = ({ cars }: RentalCalculatorFormProps) => {
	const {
		control,
		diffCollectionAndReturnAddress,
		selectOptions,
		startDate,
		price,
	} = useRentalCalculatorForm({
		cars,
	});

	return (
		<Container as="form">
			<div className="flex flex-col gap-4">
				<Controller
					name="carId"
					control={control}
					render={({ field: { onChange, ...field } }) => (
						<Select
							aria-label="Samochód"
							placeholder="Wybierz samochód"
							options={selectOptions}
							onValueChange={onChange}
							{...field}
						/>
					)}
				/>
				<div className="flex w-full flex-col gap-4 md:flex-row">
					<Controller
						name="startDate"
						control={control}
						render={({ field: { onChange, ...field } }) => (
							<DatePicker
								label="Data Odbioru"
								fromDate={new Date()}
								onSelect={onChange}
								fullWidth
								{...field}
							/>
						)}
					/>
					<Controller
						name="endDate"
						control={control}
						render={({ field: { onChange, ...field } }) => (
							<DatePicker
								label="Data Zwrotu"
								fromDate={startDate}
								onSelect={onChange}
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
										<LocationSelect
											placeholder="Miejsce odbioru"
											defaultPlaces={[DEFAULT_ADDRESS]}
											onValueChange={onChange}
											{...field}
										/>
									)}
								/>
								<Controller
									name="returnAddress"
									control={control}
									render={({ field: { onChange, ...field } }) => (
										<LocationSelect
											placeholder="Miejsce zwrotu"
											defaultPlaces={[DEFAULT_ADDRESS]}
											onValueChange={onChange}
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
									<LocationSelect
										placeholder="Miejsce odbioru i zwrotu"
										defaultPlaces={[DEFAULT_ADDRESS]}
										onValueChange={onChange}
										{...field}
									/>
								)}
							/>
						)}
						<Input placeholder="Wiek wynajmującego" />
						<Input type="email" placeholder="E-mail" />
						<Input placeholder="Numer telefonu" />
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
				{price}zł <span className="text-2xl font-semibold">netto</span>
			</p>
			<Button icon={ArrowRight} moveIcon>
				Wyślij zapytanie
			</Button>
		</Container>
	);
};
