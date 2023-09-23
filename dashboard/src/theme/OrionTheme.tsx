import { PaletteColor, SimplePaletteColorOptions, PaletteOptions } from '@mui/material';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme } from '@mui/material/styles';

// Fonts
import PoppinsRegular from '../assets/fonts/Poppins-Regular-400.ttf';
import PoppinsMedium from '../assets/fonts/Poppins-Medium-500.ttf';
import PoppinsBold from '../assets/fonts/Poppins-SemiBold-600.ttf';
import RobotoRegular from '../assets/fonts/Roboto-Regular-400.ttf';
import Robo2oBold from '../assets/fonts/Roboto-Bold-700.ttf';
import SenRegular from '../assets/fonts/Sen-Regular-400.ttf';

// ---------------------------------------------- Type Definitions ---------------------------------------------------

interface SidebarConfigOptions {
	btnBg: string;
	bg: string;
}

interface TextColorsOptions {
	primary: SimplePaletteColorOptions;
	warning: SimplePaletteColorOptions;
	secondary: SimplePaletteColorOptions;
}

interface ShadowOptions {
	main: React.CSSProperties['boxShadow'];
}

declare module '@mui/material/styles' {
	interface Theme {
		sidebarConfig: SidebarConfigOptions;
		textColors: TextColorsOptions;
		shadow: ShadowOptions;
		bg: string;
		primaryGradient: string;
	}

	interface ThemeOptions {
		sidebarConfig?: SidebarConfigOptions;
		textColors?: TextColorsOptions;
		shadow?: ShadowOptions;
		bg: string;
		primaryGradient?: string;
	}

	interface SimplePaletteColorOptions {
		light?: string;
		main: string;
		dark?: string;
		contrastText?: string;
		'100'?: string;
		'200'?: string;
		'300'?: string;
		'400'?: string;
	}

	interface Palette {
		display1: PaletteColor; // orange
		display2: PaletteColor; // green
		display3: PaletteColor; // pink
		display4: PaletteColor; // purple
		display5: PaletteColor; // very light grey
		neutral1: PaletteColor; // gray
		neutral2: PaletteColor; // Blueish
		neutral3: PaletteColor; // pure gray
		highlight1: PaletteColor; // aqua
		highlight2: PaletteColor; // yellow
		info1: PaletteColor; // Cool red
		info2: PaletteColor; // Cool purple
		info3: PaletteColor; // Cool pink
		glow1: PaletteColor; // yellow
		glow2: PaletteColor; // blue
		icon: PaletteColor;
		notification: PaletteColor;
		section: PaletteColor;
		field: PaletteColor;
	}

	interface PaletteOptions {
		display1?: SimplePaletteColorOptions; // orange
		display2?: SimplePaletteColorOptions; // green
		display3?: SimplePaletteColorOptions; // pink
		display4?: SimplePaletteColorOptions; // purple
		display5?: SimplePaletteColorOptions; // very light grey
		neutral1?: SimplePaletteColorOptions; // gray
		neutral2?: SimplePaletteColorOptions; // Blueish
		neutral3?: SimplePaletteColorOptions; // pure gray
		highlight1?: SimplePaletteColorOptions; // aqua
		highlight2?: SimplePaletteColorOptions; // yellow
		info1?: SimplePaletteColorOptions; // Cool red
		info2?: SimplePaletteColorOptions; // Cool purple
		info3?: SimplePaletteColorOptions; // Cool pink
		glow1?: SimplePaletteColorOptions; // yellow
		glow2?: SimplePaletteColorOptions; // blue
		icon?: SimplePaletteColorOptions;
		notification?: SimplePaletteColorOptions;
		section?: SimplePaletteColorOptions;
		field?: SimplePaletteColorOptions;
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		display2: true;
		display3: true;
		highlight1: true;
		highlight2: true;
		info1: true;
		info2: true;
		info3: true;
		glow1: true;
		neutral3: true;
	}
}

declare module '@mui/material/IconButton' {
	interface IconButtonPropsColorOverrides {
		icon: true;
		neutral3: true;
	}
}

declare module '@mui/material/Badge' {
	interface BadgePropsColorOverrides {
		notification: true;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsColorOverrides {
		info1: true;
		info2: true;
		info3: true;
		neutral1: true;
		neutral2: true;
		highlight1: true;
		highlight2: true;
	}
}

// ---------------------------------------------- Colors ---------------------------------------------------

const palette: PaletteOptions = {
	secondary: {
		'50': '#E6F6FF',
		'100': '#CCE4FF',
		'200': '#99CDFF',
		'300': '#66B6FF',
		'400': '#339FFF',
		'500': '#62ABFF',
		'600': '#2888FF',
		'700': '#1F4FCC',
		'800': '#144099',
		'900': '#0A1A66',
		light: '#91c4ff',
		main: '#62ABFF',
		dark: '#1F4FCC',
		contrastText: '#FFF'
	},

	primary: {
		'50': '#fff0ff',
		'100': '#ede7f6',
		'200': '#d1c4e9',
		'300': '#9575cd',
		'400': '#7e57c2',
		'500': '#673ab7',
		'600': '#5e35b1',
		'700': '#512da8',
		'800': '#4527a0',
		'900': '#311b92',
		light: '#d1c4e9',
		main: '#673ab7',
		dark: '#5e35b1',
		contrastText: '#FFF'
	},

	success: {
		'100': '#D3FFDF',
		'200': '#A3FFC9',
		'300': '#74FFB3',
		'400': '#53F8A7',
		'500': '#53F8A7',
		'600': '#31D986',
		'700': '#247027',
		'800': '#175418',
		'900': '#0A2C0A',
		light: '#A3FFC9',
		main: '#53F8A7',
		dark: '#247027',
		contrastText: '#247027'
	},
	warning: {
		// Red
		light: '#f7bfba',
		main: '#FFB0A9',
		dark: '#953030',
		contrastText: '#751717'
	},

	// The following colors are used for the stat cards
	display1: {
		// Orange
		light: '#FFD9B3',
		main: '#FD986D',
		dark: '#fc814c'
	},
	display2: {
		// Green
		main: '#57DC84'
	},
	display3: {
		// Pink
		main: '#FF8198'
	},
	display4: {
		// Light Red
		main: '#8A6DFD'
	},
	display5: {
		// very light grey
		main: '#C5C5C5'
	},

	// The following colors are used for mainly for chips and inputs and other stuff here and there
	neutral1: {
		// Grayish
		main: '#EDEDF9',
		contrastText: '#647D99E5'
	},
	neutral2: {
		// Blue-ish gray
		light: '#EDEDF9',
		main: '#DAE2FF',
		contrastText: '#647D99E5'
	},
	neutral3: {
		// Pure gray- Used for disabled states
		light: '#D9DBE1',
		main: '#D0D2D1',
		dark: '#969BAB'
	},

	// The following colors are used to display 'info'
	info1: {
		// Cool red
		main: '#FFF8FCB2',
		dark: '#FF9FC1',
		contrastText: '#BE7594'
	},
	info2: {
		// Cool purple
		main: '#EEE9FFAD',
		dark: '#9779DF',
		contrastText: '#7965C8'
	},
	info3: {
		// Cool pink
		main: '#FFF4F4',
		dark: '#F812B7',
		contrastText: '#CF1563'
	},

	// The following colors are used to highlight parts of wherever info colors are used
	highlight1: {
		// aqua
		main: '#F7FDFF',
		contrastText: '#127CF8'
	},
	highlight2: {
		// golden
		main: '#FEFFF4',
		contrastText: '#ED6C02DB'
	},

	// These colors will be used for invite cards
	glow1: {
		// Golden
		light: '#FFFFFC',
		main: '#FF7D05',
		dark: '#FFB422'
	},
	glow2: {
		// Blue
		light: '#F7FDFFE5',
		main: '#54A3FF',
		dark: '#54A3FF'
	},

	icon: {
		main: '#DEF1FC',
		contrastText: '#2B404B'
	},

	notification: {
		main: '#FF5252',
		contrastText: '#F8F8FF'
	},

	// The following color is used for each section card
	section: {
		// glass
		light: '#FFFFFF',
		main: '#FCFEFED9'
	},
	// The followig color is used for input fields
	field: {
		// Input ke colours
		light: '#54A3FF1A',
		main: '#348FF91A',
		dark: '#348FF9'
	}
};

const textColors: TextColorsOptions = {
	primary: {
		light: '#969BAB',
		main: '#636465',
		dark: '#474C59'
	},
	warning: {
		main: '#FF6262'
	},
	secondary: {
		main: '#407EC8'
	}
};

const sidebarConfig: SidebarConfigOptions = {
	btnBg: 'linear-gradient(166.88deg, #54A3FF 9.45%, #348FF9 227.32%)',
	bg: 'rgba(252, 254, 254, 0.43)'
};

const shadow: ShadowOptions = {
	main: '0px 18.543689727783203px 64.90291595458984px 0px rgba(86, 138, 146, 0.1)'
};

// ---------------------------------------------- Theme ---------------------------------------------------

const OrionTheme = createTheme({
	palette: palette,
	textColors: textColors,
	sidebarConfig: sidebarConfig,
	bg: 'conic-gradient(from 136.11deg at 39.58% 43.78%, #F5F6FF -56.04deg, #F8F9FF 8.89deg, #F4F8FF 120.09deg, #F5F6FF 303.96deg, #F8F9FF 368.89deg)',
	shadow: shadow,
	primaryGradient: 'linear-gradient(166.88deg, #54A3FF 9.45%, #348FF9 227.32%)',

	typography: {
		fontFamily: 'Poppins',
		fontSize: 14,
		htmlFontSize: 16,
		// The following 5 are the only font styles defined in figma
		h1: {
			// Big Titles
			fontWeight: 500,
			fontSize: 20,
			// lineHeight: 30,
			color: textColors.primary.dark
			// fontSize: '3rem'
		},
		h2: {
			// Small Titles
			fontWeight: 500,
			fontSize: 18,
			// lineHeight: 27,
			color: textColors.primary.dark
		},
		h3: {
			fontWeight: 500,
			fontSize: 16,
			color: textColors.primary.main
		},
		h4: {
			fontWeight: 400,
			fontSize: 14,
			color: textColors.primary.dark
		},
		body1: {
			// Normal Text
			fontFamily: 'Poppins',
			fontWeight: 400,
			fontSize: 12,
			// lineHeight: 21,
			color: textColors.primary.main
		},
		caption: {
			// Small Text
			fontFamily: 'Poppins',
			fontWeight: 400,
			fontSize: 12,
			// lineHeight: 18,
			color: textColors.primary.light
		},
		subtitle1: {
			// Normal Emphasis
			fontFamily: 'Poppins',
			fontWeight: 400,
			fontSize: 16,
			// lineHeight: 24,
			color: textColors.primary.light
		},

		// The rest of these are currently unused.
		// They are NOT CUSTOMIZED according to the new design
		// Modify and use them if necessary

		h5: {
			fontWeight: 500,
			fontSize: 14,
			color: textColors.primary.main
		},
		h6: {
			fontWeight: 400,
			fontSize: 12,
			color: textColors.primary.main
		},
		body2: {
			fontFamily: 'Sen',
			fontWeight: 'regular',
			fontSize: 12,
			color: textColors.primary.light
		},
		button: {
			fontWeight: 400,
			fontSize: 14
		},
		subtitle2: {
			fontFamily: 'Sen',
			fontWeight: 'regular',
			fontSize: 13,
			color: textColors.primary.light
		},
		overline: {
			fontSize: 13,
			fontWeight: 600,
			textTransform: 'uppercase',
			color: textColors.primary.light
		}
	},

	components: {
		MuiCssBaseline: {
			// Global CSS goes here
			styleOverrides: theme => `

				@global : {
					*::-webkit-scrollbar {
						width: 0.5em;
					},
					*::-webkit-scrollbar-track {
						background-color: ${theme.palette.background.default};
					},
					*::-webkit-scrollbar-thumb {
						background-color: ${theme.palette.primary.main};
						outline: 1px solid ${theme.palette.primary.main};
					}
				}

				body {
					overflow: scroll;
					overflow-x: hidden;
					background: ${theme.bg};
				}

				//------------------------------- Loading Fonts ------------------------------------------------

				@font-face {
					font-family: Poppins;
					font-weight: 400;
					src: url(${PoppinsRegular});
				};

				@font-face {
					font-family: Poppins;
					font-weight: 500;
					src: url(${PoppinsMedium});
				};

				@font-face {
					font-family: Poppins;
					font-weight: 600;
					src: url(${PoppinsBold});
				};

				@font-face {
					font-family: 'Sen';
					font-weight: 400;
					src: url(${SenRegular});
				};

				//------------------------------- Styles for the Grafs ------------------------------------------------

				.apexcharts-tooltip {
					// background: transparent !important;
					// border: none !important;
					// box-shadow: none !important;
					// overflow: visible !important;
				}

				.line-graph-tooltip {
					background-color: white;
					border: 3px solid #62abff;
					padding: 8px 16px;
					border-radius: 50px;
					/* transform: translateY(-50%); */
				}

				.bar-graph-tooltip {
					background: linear-gradient(270.15deg, ${theme.palette.highlight1.dark} 19.44%, ${theme.palette.highlight1.main} 81.9%);
					padding: 8px 32px;
					border-radius: 24px;
					color: ${theme.textColors.secondary.main};
					margin-bottom: 32px;
					/* transform: translate(-50%, -50%); */
					/* transform: translateY(-50%); */
					text-align: center;
				}

				.bar-graph-tooltip span {
					color: ${theme.textColors.secondary.main};
					font-size: 12px;
				}

				.bar-graph-tooltip p {
					margin: 0;
					padding: 0;
					font-size: 18px;
				}

			`
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					background: sidebarConfig.bg,
					border: '2px solid rgba(255, 255, 255, 0.2)',
					backdropFilter: 'blur(50px)',
					padding: '18px',
					boxShadow: 'none',
					borderRadius: 0
				}
			}
		},
		MuiButton: {
			defaultProps: {
				// variant: 'contained',
				disableElevation: true,
				disableRipple: true
			},
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					textTransform: 'none',
					'&:hover': {
						background:
							ownerState.color === undefined
								? 'none'
								: ownerState.color === 'inherit'
								? 'inherit'
								: ownerState.style
								? ownerState.style.background
								: theme.palette[ownerState.color].main
					}
					// '&.Mui-outlined': {
					// 	border: `1px solid ${theme.palette.neutral1.main}`,
					// 	color: theme.palette.neutral1.main,
					// 	'&:hover': {
					// 		border: `1px solid ${theme.palette.neutral1.main}`,
					// 		color: theme.palette.neutral1.main
					// 	}
					// }
				})
			}
		},
		MuiIconButton: {
			styleOverrides: {
				root: ({ ownerState, theme }) => {
					const bg = ownerState.color;
					let styles = { background: '', color: '' };
					if (bg === undefined || bg === 'default')
						styles = {
							background: theme.palette.neutral1.main,
							color: theme.palette.neutral1.contrastText
						};
					else if (bg === 'inherit')
						styles = {
							background: 'inherit',
							color: 'inherit'
						};
					else
						styles = {
							background: theme.palette[bg].main,
							color: theme.palette[bg].contrastText
						};
					return {
						'&:hover': {
							background: styles.background
						},
						...styles
					};
				}
			}
		},
		MuiSwitch: {
			styleOverrides: {
				root: ({ ownerState, theme }) => {
					const width = 32;
					const height = 16;
					const thumbGap = 6;
					const thumbSize = height - thumbGap;
					const translateDist = width - thumbSize - thumbGap;
					return {
						width: width,
						height: height,
						padding: 0,
						'& .MuiSwitch-switchBase': {
							padding: 0,
							margin: thumbGap / 2,
							transitionDuration: '300ms',
							'&.Mui-checked': {
								transform: `translateX(${translateDist}px)`,
								color: '#fff',
								'& + .MuiSwitch-track': {
									background: theme.palette.primary.main,
									opacity: 1,
									border: 0
								},
								'&.Mui-disabled + .MuiSwitch-track': {
									opacity: 0.5
								}
							},
							'&.Mui-focusVisible .MuiSwitch-thumb': {
								color: theme.palette.primary.main,
								border: '6px solid #fff'
							},
							'&.Mui-disabled .MuiSwitch-thumb': {
								opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
							},
							'&.Mui-disabled + .MuiSwitch-track': {
								opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
							}
						},
						'& .MuiSwitch-thumb': {
							boxSizing: 'border-box',
							width: thumbSize,
							height: thumbSize
						},
						'& .MuiSwitch-track': {
							borderRadius: height / 2,
							backgroundColor: '#969BAB',
							opacity: 1,
							transition: theme.transitions.create(['background-color'], {
								duration: 500
							})
						}
					};
				}
			}
		},
		MuiSlider: {
			styleOverrides: {
				rail: ({ theme }) => ({
					background: theme.palette.grey[400],
					height: '6px'
				}),
				track: {
					height: '8px'
				},
				thumb: ({ theme }) => ({
					border: `4px solid ${theme.palette.icon.main}`,
					'&:before': {
						boxShadow: 'none'
					}
				}),
				mark: {
					display: 'none'
				}
			}
		},
		// MuiSvgIcon: {
		// 	styleOverrides: {
		// 		root: ({ ownerState, theme }) => {
		// 			const bg = ownerState.color;
		// 			let styles = { background: '', color: '' };
		// 			if (
		// 				bg === undefined ||
		// 				bg === 'disabled' ||
		// 				bg === 'action'
		// 			)
		// 				styles = {
		// 					background: theme.palette.primary.main,
		// 					color: theme.palette.primary.contrastText
		// 				};
		// 			else if (bg === 'inherit')
		// 				styles = {
		// 					background: 'inherit',
		// 					color: 'inherit'
		// 				};
		// 			else
		// 				styles = {
		// 					background: theme.palette[bg].main,
		// 					color: theme.palette[bg].contrastText
		// 				};
		// 			return {
		// 				borderRadius: '100%',
		// 				...styles
		// 			};
		// 		}
		// 	}
		// },
		MuiTabs: {
			defaultProps: {
				variant: 'fullWidth'
			},
			styleOverrides: {
				root: ({ theme }) => ({
					borderBottom: `1px solid ${theme.palette.primary.main}`
				}),
				indicator: {
					display: 'none'
				}
			}
		},
		MuiTab: {
			defaultProps: {
				disableRipple: true,
				iconPosition: 'start'
			},
			styleOverrides: {
				root: ({ theme }) => ({
					fontWeight: 600,
					textTransform: 'none',

					'& .MuiChip-root': {
						margin: theme.spacing(0, 1),
						backgroundColor: theme.palette.grey[500],
						fontWeight: 600,
						color: theme.palette.primary.contrastText
					},

					'&.Mui-selected .MuiChip-root': {
						backgroundColor: theme.palette.primary.main
					}
				})
			}
		},
		MuiChip: {
			defaultProps: {
				size: 'small'
			},
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: 15,
					backgroundColor: theme.palette.neutral3.main,
					fontWeight: 600,
					color: theme.palette.primary.contrastText
				})
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: ({ theme }) => ({
					// padding: theme.spacing(3),
					boxShadow: theme.shadow.main,
					borderRadius: 15,
					backgroundColor: theme.palette.section.main,
					border: `2px solid ${theme.palette.section.light}`,
					backdropFilter: 'blur(60px)'
				})
			}
		},
		// MuiOutlinedInput: {
		//     styleOverrides: {
		//         root: {
		//             borderRadius: 15,
		//             border: 'none',
		//             background: palette.section.light,
		//             boxShadow: shadow.main,
		//         }
		//     }
		// }
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					border: 'none'
				}
			}
		},
		MuiPopover: {
			styleOverrides: {
				paper: ({ theme }) => ({
					// padding: theme.spacing(1, 2),
					// background: theme.palette.neutral1.main
				})
			}
		},
		MuiSelect: {
			styleOverrides: {
				select: ({ theme }) => ({
					padding: theme.spacing(1.5),
					borderRadius: theme.spacing(1),
					background: `linear-gradient(166.88deg, ${theme.palette.field.light} 9.45%, ${theme.palette.field.main} 227.32%)`
				}),
				icon: {
					display: 'none'
				}
			}
		},
		MuiAutocomplete: {
			defaultProps: {
				forcePopupIcon: false,
				ChipProps: {
					color: 'neutral2',
					sx: {
						fontWeight: 400
					}
				}
			},
			styleOverrides: {
				// paper: {
				// 	padding: 0
				// }
			}
		},
		MuiDatePicker: {
			defaultProps: {
				// PaperProps: {
				// 	sx: {
				// 		p: 0
				// 	}
				// },
				disableOpenPicker: true,
				disableFuture: true
			}
		},
		MuiTextField: {
			defaultProps: {
				fullWidth: true
				// size: 'medium'
			},
			styleOverrides: {
				root: ({ theme }) => ({
					background: `linear-gradient(166.88deg, ${theme.palette.field.light} 9.45%, ${theme.palette.field.main} 227.32%)`,
					borderRadius: theme.spacing(1),
					height: '100%'
				})
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: ({ theme }) => ({
					fontSize: 14,
					fontWeight: 500,
					color: theme.textColors.primary.dark
				})
			}
		},
		MuiInput: {
			defaultProps: {
				fullWidth: true
			},
			styleOverrides: {
				root: ({ theme }) => ({
					background: `linear-gradient(166.88deg, ${theme.palette.field.light} 9.45%, ${theme.palette.field.main} 227.32%)`,
					borderRadius: theme.spacing(1.5),
					padding: theme.spacing(1.5),
					fontSize: 12,
					height: '100%',
					':before': {
						content: 'none'
					},
					':after': {
						content: 'none'
					}
				})
			}
		},
		MuiSkeleton: {
			defaultProps: {
				animation: 'wave'
			}
		}
	}
});

export default OrionTheme;
