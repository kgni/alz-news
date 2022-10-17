/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
// import { defaultTheme } from 'tailwindcss/defaultTheme';

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'hero-img': "url('/img/hero-img.png')",
			},

			fontFamily: {
				sans: [...defaultTheme.fontFamily.sans],
				serif: [...defaultTheme.fontFamily.serif],
			},
		},
		screens: {
			xl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			lg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			md: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			sm: { max: '639px' },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
};
