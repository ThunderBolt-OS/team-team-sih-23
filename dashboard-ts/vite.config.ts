import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), mkcert(), VitePWA({
		manifest: {
			name: 'ChakraView',
			short_name: 'ChakraView',
			description: 'Real time Vehicle Tracking System',
			start_url: '/index.html',
			background_color: '#ffffff',
			theme_color: '#000000',
			display: 'standalone',
			icons: [
				{
					src: 'pubic/logo.png',
					sizes: '192x192',
					type: 'image/png'
				}
			]
		}
	})],
	server: {
		port: 3006,
		https: false
	},
	build: {
		target: 'modules' 
	}
});
		
