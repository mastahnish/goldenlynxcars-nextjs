const LOCATION_PRICE = 400;

interface CalculateLocationPriceInput {
	defaultAddress: string;
	collectionAddress: string;
	returnAddress: string;
}

export const calculateLocationPrice = ({
	defaultAddress,
	collectionAddress,
	returnAddress,
}: CalculateLocationPriceInput) => {
	const collectionPrice =
		collectionAddress && collectionAddress !== defaultAddress
			? LOCATION_PRICE
			: 0;
	const returnPrice =
		returnAddress && returnAddress !== defaultAddress ? LOCATION_PRICE : 0;

	return collectionPrice + returnPrice;
};
