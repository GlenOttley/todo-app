/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Ubuntu', 'sans-serif']
			}
		},
		colors: {
			'very-light-gray': '#FAFAFA',
			'very-light-grayish-blue': '#E4E5F1',
			'light-grayish-blue': '#D2D3DB',
			'dark-grayish-blue': '#9394A5',
			'very-dark-grayish-blue': '#484B6A',
			'bright-blue': '#3A7BFD',
			'check-background': 'linear-gradient #57DDFF to #C058F3'
		},
		fontSize: {
			sm: ['12px', 'auto'],
			base: ['14px', 'auto'],
			lg: ['18px', 'auto']
		}
	},
	plugins: []
};
