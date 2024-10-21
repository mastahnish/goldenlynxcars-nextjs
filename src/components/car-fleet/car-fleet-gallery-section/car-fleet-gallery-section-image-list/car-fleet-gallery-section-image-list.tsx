import { CarFleetGallerySectionImageListItem } from './car-fleet-gallery-section-image-list-item';

import type { Slide } from 'yet-another-react-lightbox';

type CarFleetGallerySectionImageListProps = Readonly<{
	slides: Slide[];
	onImageClick: (index: number) => void;
}>;

const MAX_ITEMS = 4;

export const CarFleetGallerySectionImageList = ({
	slides,
	onImageClick,
}: CarFleetGallerySectionImageListProps) => {
	const overflow = slides.length - MAX_ITEMS;

	return (
		<ul className="grid grid-cols-2 gap-5 md:grid-cols-4">
			{slides.slice(0, MAX_ITEMS - 1).map((slide, i) => (
				<li key={i} className="w-full">
					<CarFleetGallerySectionImageListItem
						slide={slide}
						onClick={() => onImageClick(i)}
					/>
				</li>
			))}
			{overflow >= 0 && (
				<li className="w-full">
					<CarFleetGallerySectionImageListItem
						slide={slides[MAX_ITEMS - 1]}
						overflow={overflow}
						onClick={() => onImageClick(MAX_ITEMS - 1)}
					/>
				</li>
			)}
		</ul>
	);
};
