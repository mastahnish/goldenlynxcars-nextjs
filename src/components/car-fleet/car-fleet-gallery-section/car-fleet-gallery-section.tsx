'use client';

import { useState } from 'react';
import { Lightbox } from 'yet-another-react-lightbox';

import { CarFleetGallerySectionImageList } from './car-fleet-gallery-section-image-list/car-fleet-gallery-section-image-list';
import { getGallerySlides } from './car-fleet-gallery-section-image-list/car-fleet-gallery-section-image-list.utils';

import { Section } from '@/components/common/section';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetGallerySectionProps = Readonly<{
	car: CarFleet;
}>;

export const CarFleetGallerySection = ({
	car,
}: CarFleetGallerySectionProps) => {
	const [index, setIndex] = useState(-1);

	const slides = getGallerySlides(car);

	return (
		<Section title="Zdjęcia">
			<CarFleetGallerySectionImageList
				slides={slides}
				onImageClick={setIndex}
			/>
			<Lightbox
				index={index}
				open={index >= 0}
				close={() => setIndex(-1)}
				slides={slides}
			/>
		</Section>
	);
};
