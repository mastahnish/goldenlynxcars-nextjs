import type { Media } from '@/payload/payload-types';

export interface MediaProps {
	resource: Media | string | number;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	className?: string;
}
