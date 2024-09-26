/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			padding: {
				DEFAULT: "15px",
			},
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "960px",
			xl: "1200px",
		},
		fontFamily: {
			primary: "Hanken Grotesk",
			secondary: "Roboto",
		},
		backgroundImage: {
			fondoMain: "url(src/assets/fondoMain.jpg)",
			// imagen prueba reportes provisional
			barrasReportes: "url(src/assets/barrasReportes.jpg)",
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: "#007B7F",
					hover: "#00A3A3",
				},
				secondary: {
					DEFAULT: "#002F6C",
					hover: "#1E90FF",
				},
				accent: {
					DEFAULT: "#1A1A1A",
					hover: "#3e3a5e",
				},
			},
		},
	},
	plugins: [],
};
