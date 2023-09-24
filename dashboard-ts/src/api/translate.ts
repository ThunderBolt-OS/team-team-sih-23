// Function to translate text using Google Translate API
export default async function translateText(inputText: string, newLanguage: string) {
	const apiKey = 'AIzaSyCdcfPljjnzuOBlUbxvZ5Z54B6DTJ28Lt4';
	const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

	const requestBody = {
		q: inputText,
		source: 'en',
		target: newLanguage
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (!response.ok) {
			throw new Error('Translation failed');
		}

		const data = await response.json();
		return data.data.translations[0].translatedText as string;
	} catch (error) {
		console.error('Translation error:', error);
		// Return the original input string in case of an error
	}
	return inputText;
}

// Example usage:
// const inputText = "Hello, how are you?";
// const newLanguage = "gu";     // Spanish

// translateText(inputText, newLanguage)
//     .then((translatedText) => {
//         console.log("Translated Text:", translatedText);
//     })
//     .catch((error) => {
//         console.error("Translation error:", error);
//     });
