import * as migration_20240814_081827_init from './20240814_081827_init';
import * as migration_20240814_085314_add_hero_global from './20240814_085314_add_hero_global';
import * as migration_20240816_133846_add_services_section from './20240816_133846_add_services_section';
import * as migration_20240818_152625_add_car_fleet from './20240818_152625_add_car_fleet';

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
];
