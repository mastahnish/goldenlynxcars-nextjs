import type { GlobalConfig } from 'payload';

export const RentalsSchedule: GlobalConfig = {
	slug: 'rentals-schedule',
	label: 'Rentals Schedule',
	fields: [
		{
			name: 'schedule',
			type: 'ui',
			admin: {
				components: {
					Field:
						'@/payload/collections/dashboard/RentalsSchedule/ui/rentals-schedule/rentals-schedule',
				},
			},
		},
	],
	admin: {
		group: 'Dashboard',
	},
};
