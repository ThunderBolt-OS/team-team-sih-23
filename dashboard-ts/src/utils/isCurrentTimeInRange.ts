export default function isCurrentTimeInRange(start_time: Date, end_time: Date): boolean {
	const currentTime = new Date();
	const is_current = currentTime >= start_time && currentTime <= end_time;

	// console.log(start_time, end_time, is_current);
	return is_current;
}
