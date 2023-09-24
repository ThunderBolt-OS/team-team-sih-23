export function addMinutes(date: Date, minutes: number) {
	date.setMinutes(date.getMinutes() + minutes);
	return date.toLocaleTimeString(navigator.language, {
		hour: '2-digit',
		minute: '2-digit'
	});
}
