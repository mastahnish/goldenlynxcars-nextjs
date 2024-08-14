import * as migration_20240814_081827_init from './20240814_081827_init';
import * as migration_20240814_085314_add_hero_global from './20240814_085314_add_hero_global';

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
];
