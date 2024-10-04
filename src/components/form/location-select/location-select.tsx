import { LocationSelectList } from './location-select-list/location-select-list';
import { useLocationSelect } from './use-location-select';

import { Input } from '@/components/ui/input';

type LocationSelectProps = Readonly<{
	placeholder: string;
	defaultPlaces?: string[];
	value: string;
	onValueChange: (value: string) => void;
}>;

export const LocationSelect = ({
	placeholder,
	defaultPlaces = [],
	value,
	onValueChange,
}: LocationSelectProps) => {
	const {
		containerRef,
		inputValue,
		isLoading,
		isSuccess,
		isError,
		data,
		isListOpen,
		setIsOpen,
		handleInputChange,
		handleItemClick,
	} = useLocationSelect({ defaultPlaces, value, onValueChange: onValueChange });

	return (
		<div
			ref={containerRef}
			onClick={() => setIsOpen(isOpen => !isOpen)}
			className="relative w-full"
		>
			<Input
				placeholder={placeholder}
				value={inputValue}
				onChange={handleInputChange}
				fullWidth
			/>
			{isListOpen && (
				<LocationSelectList
					isLoading={isLoading}
					isSuccess={isSuccess}
					isError={isError}
					defaultPlaces={defaultPlaces}
					places={data?.places ?? []}
					onItemClick={handleItemClick}
				/>
			)}
		</div>
	);
};
