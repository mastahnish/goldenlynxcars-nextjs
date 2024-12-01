const driveTypes = ['FWD', 'RWD', 'AWD', '4WD'];

export const getDriveTypeOptions = () =>
	driveTypes.map(type => ({
		label: type,
		value: type,
	}));
