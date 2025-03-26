import * as migration_20240814_081827_init from './20240814_081827_init';
import * as migration_20240814_085314_add_hero_global from './20240814_085314_add_hero_global';
import * as migration_20240816_133846_add_services_section from './20240816_133846_add_services_section';
import * as migration_20240818_152625_add_car_fleet from './20240818_152625_add_car_fleet';
import * as migration_20240819_074811_add_opinion_section from './20240819_074811_add_opinion_section';
import * as migration_20240820_133214_add_faq_section from './20240820_133214_add_faq_section';
import * as migration_20240823_101829_add_contact_section from './20240823_101829_add_contact_section';
import * as migration_20250313_204254 from './20250313_204254';
import * as migration_20250326_130621_add_car_subscription from './20250326_130621_add_car_subscription';

export const migrations = [
	{
		up: migration_20240814_081827_init.up,
		down: migration_20240814_081827_init.down,
		name: '20240814_081827_init',
	},
	{
		up: migration_20240814_085314_add_hero_global.up,
		down: migration_20240814_085314_add_hero_global.down,
		name: '20240814_085314_add_hero_global',
	},
	{
		up: migration_20240816_133846_add_services_section.up,
		down: migration_20240816_133846_add_services_section.down,
		name: '20240816_133846_add_services_section',
	},
	{
		up: migration_20240818_152625_add_car_fleet.up,
		down: migration_20240818_152625_add_car_fleet.down,
		name: '20240818_152625_add_car_fleet',
	},
	{
		up: migration_20240819_074811_add_opinion_section.up,
		down: migration_20240819_074811_add_opinion_section.down,
		name: '20240819_074811_add_opinion_section',
	},
	{
		up: migration_20240820_133214_add_faq_section.up,
		down: migration_20240820_133214_add_faq_section.down,
		name: '20240820_133214_add_faq_section',
	},
	{
		up: migration_20240823_101829_add_contact_section.up,
		down: migration_20240823_101829_add_contact_section.down,
		name: '20240823_101829_add_contact_section',
	},
	{
		up: migration_20250313_204254.up,
		down: migration_20250313_204254.down,
		name: '20250313_204254',
	},
	{
		up: migration_20250326_130621_add_car_subscription.up,
		down: migration_20250326_130621_add_car_subscription.down,
		name: '20250326_130621_add_car_subscription',
	},
];
