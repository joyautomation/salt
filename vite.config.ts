import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3014,
		host: true,
		allowedHosts: ['mira1']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
