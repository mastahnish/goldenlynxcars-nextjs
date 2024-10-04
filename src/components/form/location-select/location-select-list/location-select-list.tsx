import { match } from 'ts-pattern';

import { LocationSelectListDefaultPlaces } from './location-select-list-default-places';
import { LocationSelectListLoading } from './location-select-list-loading';
import { LocationSelectListPlaces } from './location-select-list-places';

type LocationSelectListProps = Readonly<{
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	defaultPlaces: string[];
	places: { formattedAddress: string }[];
	onItemClick: (content: string) => void;
}>;

export const LocationSelectList = ({
	onItemClick,
	...props
}: LocationSelectListProps) => (
	<ul className="absolute z-30 w-full translate-y-2.5 overflow-hidden rounded-lg border border-secondary bg-form-field text-white">
		{match(props)
			.with({ isLoading: true }, () => <LocationSelectListLoading />)
			.with({ isSuccess: true }, ({ places }) => (
				<LocationSelectListPlaces places={places} onItemClick={onItemClick} />
			))
			.with({ isError: true }, () => (
				<p className="px-4 py-2 text-lg">Ups, coś poszło nie tak!</p>
			))
			.otherwise(({ defaultPlaces }) => (
				<LocationSelectListDefaultPlaces
					places={defaultPlaces}
					onItemClick={onItemClick}
				/>
			))}
	</ul>
);
