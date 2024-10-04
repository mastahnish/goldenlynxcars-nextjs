import { LocationSelectListItem } from './location-select-list-item';

type LocationSelectListPlacesProps = Readonly<{
	places: { formattedAddress: string }[];
	onItemClick: (content: string) => void;
}>;

export const LocationSelectListPlaces = ({
	places,
	onItemClick,
}: LocationSelectListPlacesProps) =>
	places.map(({ formattedAddress }) => (
		<li key={formattedAddress} className="group">
			<LocationSelectListItem
				label={formattedAddress}
				onClick={() => onItemClick(formattedAddress)}
			/>
		</li>
	));
