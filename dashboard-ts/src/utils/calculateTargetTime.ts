// utils/calculateTargetTime.ts
const calculateTargetTime = (timeDifferenceInMinutes: number): number => {
	const targetTimeInMilliseconds = Date.now() + timeDifferenceInMinutes * 60 * 1000;
	return targetTimeInMilliseconds;
};

export default calculateTargetTime;
