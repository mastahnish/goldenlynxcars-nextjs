import { useClickAway, useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { useGetPlacesByText } from '@/hooks/use-get-places-by-text';

import type { ChangeEvent } from 'react';

interface UseLocationSelectInput {
	defaultPlaces: string[];
	value?: string;
	onValueChange: (value: string) => void;
}

export const useLocationSelect = ({
	defaultPlaces,
	value,
	onValueChange,
}: UseLocationSelectInput) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const debouncedValue = useDebounce(inputValue, 1000);
	const { isLoading, isFetched, isSuccess, isError, data } =
		useGetPlacesByText(debouncedValue);
	const containerRef = useClickAway<HTMLDivElement>(() => setIsOpen(false));

	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setInputValue(target.value);
		onValueChange('');
	};

	const handleItemClick = (content: string) => {
		setInputValue(content);
		onValueChange(content);
	};

	const isListOpen =
		!value && isOpen && (isLoading || isFetched || !!defaultPlaces.length);

	return {
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
	};
};
