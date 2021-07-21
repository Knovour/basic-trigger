import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import rollupTypescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'

export default {
	input: {
		dialog: 'src/roles/dialog',
		tablist: 'src/roles/tablist',
		button: 'src/roles/button',
	},
	output: {
		format: 'es',
		dir: 'dist',
	},
	plugins: [
		serve({ contentBase: ['dist', 'test'] }),
		livereload(),
		resolve({
			extensions: ['.js', '.ts'],
		}),
		rollupTypescript(),
	],
}
