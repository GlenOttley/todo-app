/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			borderRadius: {
				DEFAULT: '5px'
			},
			boxShadow: {
				DEFAULT: '0 35px 50px -15px rgba(194, 195, 214, 0.5)',
				dark: '0 35px 50px -15px rgba(0, 0, 0, 0.5)'
			},
			fontFamily: {
				sans: ['Josefin Sans', 'sans-serif']
			}
		},
		screens: {
			sm: '375px',
			md: '588px'
		},
		colors: {
			transparent: 'transparent',
			white: '#FFFFFF',
			'very-light-gray-bg': '#FAFAFA',
			'very-light-grayish-blue': '#E4E5F1',
			'light-grayish-blue': '#D2D3DB',
			'very-light-gray': '#C8CBE7',
			'dark-grayish-blue': '#9394A5',
			'light-gray': '#767992',
			'very-dark-grayish-blue': '#484B6A',
			gray: '#393A4B',
			'dark-gray': '#25273D',
			'very-dark-gray': '#171823',
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
