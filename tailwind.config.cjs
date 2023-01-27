/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderRadius: {
				DEFAULT: '5px'
			},
			boxShadow: {
				DEFAULT: '0 35px 50px -15px rgba(194, 195, 214, 0.5)'
			},
			fontFamily: {
				sans: ['Ubuntu', 'sans-serif']
			}
		},
		colors: {
			transparent: 'transparent',
			white: '#FFFFFF',
			'very-light-gray': '#FAFAFA',
			'very-light-grayish-blue': '#E4E5F1',
			'light-grayish-blue': '#D2D3DB',
			'dark-grayish-blue': '#9394A5',
			'very-dark-grayish-blue': '#484B6A',
			'bright-blue': '#3A7BFD',
			cyan: '#57DDFF',
			purple: '#C058F3'
		},
		container: {
			center: true,
			padding: '24px'
		},
		fontSize: {
			sm: ['12px', 'auto'],
			base: ['14px', 'auto'],
			lg: ['18px', 'auto']
		}
	},
	plugins: []
};
