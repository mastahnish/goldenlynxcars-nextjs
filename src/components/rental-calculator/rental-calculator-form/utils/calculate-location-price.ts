const LOCATION_PRICE = 400;

interface CalculateLocationPriceInput {
	defaultAddress: string;
	diffCollectionAndReturnAddress: boolean;
	collectionAndReturnAddress: string;
	collectionAddress: string;
	returnAddress: string;
}

export const calculateLocationPrice = ({
	defaultAddress,
	diffCollectionAndReturnAddress,
	collectionAndReturnAddress,
	collectionAddress,
	returnAddress,
}: CalculateLocationPriceInput) => {
	const collectionAndReturnPrice =
		!diffCollectionAndReturnAddress &&
		collectionAndReturnAddress !== defaultAddress
			? LOCATION_PRICE * 2
			: 0;
	const collectionPrice =
		diffCollectionAndReturnAddress && collectionAddress !== defaultAddress
			? LOCATION_PRICE
			: 0;
	const returnPrice =
		diffCollectionAndReturnAddress && returnAddress !== defaultAddress
			? LOCATION_PRICE
			: 0;

	return collectionAndReturnPrice + collectionPrice + returnPrice;
};
