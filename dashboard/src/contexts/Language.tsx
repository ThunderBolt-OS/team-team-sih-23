import { Typography } from '@mui/material';
import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';
import translateText from '../api/translate';

type LanguageContextType = {
	AllLanguages: {
		name: string;
		code: string;
	}[];
	setAllLanguages: React.Dispatch<
		React.SetStateAction<
			{
				name: string;
				code: string;
			}[]
		>
	>;
	SelectedLanguage: {
		name: string;
		code: string;
	};
	setSelectedLanguage: React.Dispatch<
		React.SetStateAction<{
			name: string;
			code: string;
		}>
	>;
	TextWrapper(defaultVal: string): string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [AllLanguages, setAllLanguages] = useState([
		{ name: 'English', code: 'en' },
		{ name: 'Hindi', code: 'hi' },
		{ name: 'Assamese', code: 'as' },
		{ name: 'Bengali', code: 'bn' },
		{ name: 'Bhojpuri', code: 'bho' },
		{ name: 'Gujarati', code: 'gu' },
		{ name: 'Kannada', code: 'kn' },
		{ name: 'Konkani', code: 'gom' },
		{ name: 'Malayalam', code: 'ml' },
		{ name: 'Marathi', code: 'mr' },
		{ name: 'Meiteilon (Manipuri)', code: 'mni-Mtei' },
		{ name: 'Nepali', code: 'ne' },
		{ name: 'Odia (Oriya)', code: 'or' },
		{ name: 'Punjabi', code: 'pa' },
		{ name: 'Sanskrit', code: 'sa' },
		{ name: 'Sindhi', code: 'sd' },
		{ name: 'Tamil', code: 'ta' },
		{ name: 'Telugu', code: 'te' }
		// { "name": "Urdu", "code": "ur" }
	]);

	function TextWrapper(defaultVal: string) {
		useEffect(() => {
			if (defaultVal) {
				translateText(defaultVal, SelectedLanguage.code).then(val => {
					setText(val);
				});
			}
			console.log(SelectedLanguage);
		}, [SelectedLanguage]);
		const [Text, setText] = useState(defaultVal);
		return Text;
	}

	const [SelectedLanguage, setSelectedLanguage] = useState({
		name: 'english',
		code: 'en'
	});

	return (
		<LanguageContext.Provider
			value={{
				AllLanguages,
				setAllLanguages,
				setSelectedLanguage,
				SelectedLanguage,
				TextWrapper
			}} // Use the new variable name here
		>
			{children}
		</LanguageContext.Provider>
	);
};

export default LanguageContext;
