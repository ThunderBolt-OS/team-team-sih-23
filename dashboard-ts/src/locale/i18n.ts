// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './english.json'; // English translations
import translationHI from './hindi.json'; // Hindi translations
import translationMR from './marathi.json'; // Marathi translations

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: translationEN },
		hi: { translation: translationHI },
		mr: { translation: translationMR }
		// Add more languages as needed
	},
	lng: 'en', // Default language
	fallbackLng: 'en', // Fallback language in case translation is missing
	interpolation: {
		escapeValue: false // React already safes from xss
	}
});

export default i18n;
