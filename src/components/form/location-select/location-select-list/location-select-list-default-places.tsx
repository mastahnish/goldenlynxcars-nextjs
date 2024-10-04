import { LocationSelectListItem } from './location-select-list-item';

type LocationSelectListDefaultPlacesProps = Readonly<{
	places: string[];
	onItemClick: (content: string) => void;
}>;

export const LocationSelectListDefaultPlaces = ({
	places,
	onItemClick,
}: LocationSelectListDefaultPlacesProps) =>
	places.map(place => (
		<li key={place} className="group">
			<LocationSelectListItem
				label={place}
				onClick={() => onItemClick(place)}
			/>
		</li>
	));
