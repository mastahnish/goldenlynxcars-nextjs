import Image from 'next/image';

import { env } from '@/lib/env';

import type { MediaProps } from './media.types';

export const ImageMedia = ({
	resource,
	width,
	height,
	fill,
	sizes,
	className,
}: MediaProps) => {
	if (typeof resource !== 'object') {
		return null;
	}

	const { alt, url } = resource;
	const src = `${env.NEXT_PUBLIC_SERVER_BASE_URL}${url}`;

	return (
		<Image
			src={src}
			alt={alt}
			fill={fill}
			sizes={sizes}
			className={className}
			{...(!fill && {
				width: width ?? resource.width ?? undefined,
				height: height ?? resource.height ?? undefined,
			})}
		/>
	);
};
