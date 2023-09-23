export default function getTimeDifference(minutes: number): string {
	// Get the current date and time
	const currentTime = new Date();

	// Calculate the time difference in milliseconds
	const timeDifference = new Date(currentTime.getTime() - minutes * 60 * 1000);

	// Extract the components of the time difference
	const days = Math.floor(timeDifference.getTime() / (24 * 60 * 60 * 1000));
	const hours = Math.floor((timeDifference.getTime() % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
	const minutesDiff = Math.floor((timeDifference.getTime() % (60 * 60 * 1000)) / (60 * 1000));
	const seconds = Math.floor((timeDifference.getTime() % (60 * 1000)) / 1000);
	const milliseconds = timeDifference.getTime() % 1000;

	// Format the time difference as [DD] [HH:[MM:]]ss[.uuuuuu]
	let formattedTimeDifference = '';
	if (days > 0) {
		formattedTimeDifference += `${days} `;
	}
	if (hours > 0 || formattedTimeDifference !== '') {
		formattedTimeDifference += `${hours.toString().padStart(2, '0')}:`;
	}
	if (minutesDiff > 0 || formattedTimeDifference !== '') {
		formattedTimeDifference += `${minutesDiff.toString().padStart(2, '0')}:`;
	}
	formattedTimeDifference += `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(6, '0')}`;

	return formattedTimeDifference;
	// return (minutes*60000).toString() + " " + formattedTimeDifference.split(" ")[1];
}
