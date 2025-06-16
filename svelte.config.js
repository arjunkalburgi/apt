import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';
dotenv.config();

const dev = process.env.VITE_NODE_ENV === 'development';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter({
			pages: 'build',   // Output directory
			assets: 'build',
			fallback: 'index.html',  // Required for SPA routing
        }),
		paths: {
			base: dev ? '' : '/apt',
		},
	}
};

export default config;
