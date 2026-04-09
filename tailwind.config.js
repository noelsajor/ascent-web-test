/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'bg-0': '#0C0D0F',
				'bg-1': '#121417',
				'surface': '#171A1F',
				'surface-2': '#1E2229',
				'text': '#F2F2F2',
				'muted': 'rgba(242, 242, 242, 0.72)',
				'line': 'rgba(255, 255, 255, 0.06)',
				'accent': '#E9D090',
				'accent-2': '#F3E1B5',
			},
			fontFamily: {
				body: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
				heading: ["GFS Didot", "Didot", "Didot LT STD", "Didot LH-Roman", "Didot LT Pro", "Bodoni Moda", "Bodoni 72", "Libre Bodoni", "Playfair Display", "Georgia", "Times New Roman", "serif"],
			},
			container: {
				center: true,
				padding: '1.5rem',
				screens: {
					'2xl': '1280px',
				},
			},
			keyframes: {
				fadeInUp: {
					'from': { opacity: '0', transform: 'translateY(20px)' },
					'to': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeInDown: {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeInSlide: {
					'0%': { opacity: '0', transform: 'translateY(-8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'from': { opacity: '0' },
					'to': { opacity: '1' },
				},
				slideIn: {
					'from': { transform: 'translateX(100%)' },
					'to': { transform: 'translateX(0)' },
				}
			},
			animation: {
				fadeInUp: 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				fadeInDown: 'fadeInDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				fadeInSlide: 'fadeInSlide 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				fadeIn: 'fadeIn 1s ease-out forwards',
				slideIn: 'slideIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
			}
		},
	},
	plugins: [],
}
