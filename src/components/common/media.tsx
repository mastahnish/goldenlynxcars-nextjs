import Image from 'next/image';

import { env } from '@/lib/env';

import type { Media as MediaType } from '@/payload/payload-types';

interface MediaProps {
	resource: MediaType | string | number;
	fill?: boolean;
	className?: string;
}

export const Media = ({ resource, fill, className }: MediaProps) => {
	if (typeof resource !== 'object') {
		return null;
	}

	const { alt, width, height, url } = resource;
	const src = `${env.NEXT_PUBLIC_MEDIA_BASE_URL}${url}`;

	return (
		<Image
			src={src}
			alt={alt}
			fill={fill}
			className={className}
			{...(!fill && {
				width: width ?? undefined,
				height: height ?? undefined,
			})}
		/>
	);
};
