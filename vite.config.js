import path from 'path'
import { defineConfig } from 'vite'
import resolve from '@rollup/plugin-node-resolve'
import rollupTypescript from '@rollup/plugin-typescript'

export default defineConfig({
	plugins: [
		resolve({
			extensions: ['.js', '.ts'],
		}),
		rollupTypescript(),
	],
	base: './',
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'BasicTrigger',
			fileName: 'basic-trigger',
			formats: ['es'],
		},
		rollupOptions: {
			output: {
				format: 'es',
				dir: 'dist',
				preserveModules: true,
				entryFileNames: `[name].js`,
			},
		},
		minify: false,
	},
})
