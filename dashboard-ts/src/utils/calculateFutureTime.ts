export default function calculateFutureTime(minutesStr: string): string {
	const minutes = parseInt(minutesStr, 10); // Convert the input string to a number
	if (isNaN(minutes)) {
		throw new Error('Invalid input. Please provide a valid number of minutes.');
	}

	const currentTime = new Date();
	const futureTime = new Date(currentTime.getTime() + minutes * 60000); // Convert minutes to milliseconds

	// Format the future time to ISO format
	const isoFormattedTime = futureTime.toISOString();
	return isoFormattedTime;
}
