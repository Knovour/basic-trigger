import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import rollupTypescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'

export default {
	input: {
		// index: 'src/index.ts',
		dialog: 'src/roles/dialog',
		tablist: 'src/roles/tablist'
	},
	output: {
    format: 'es',
		dir: 'dist'
  },
	plugins: [
    serve({ contentBase: ['dist', 'test'] }),
		livereload(),
		resolve({
			extensions: ['.js', '.ts']
		}),
		rollupTypescript(),
  ]
}
