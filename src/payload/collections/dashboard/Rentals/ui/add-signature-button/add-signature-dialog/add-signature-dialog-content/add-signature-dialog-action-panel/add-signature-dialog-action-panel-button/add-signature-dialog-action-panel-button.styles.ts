import { cva } from 'class-variance-authority';

export const variants = cva('h-16 w-full border-none', {
	variants: {
		action: {
			accept: 'bg-green-700',
			clear: 'bg-blue-400',
			close: 'bg-red-500',
		},
	},
});
