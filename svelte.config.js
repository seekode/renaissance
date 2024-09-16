import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			prependData: `@import 'src/lib/scss/variables.scss'; @import 'src/lib/scss/main.scss';`
		},
		typescript: true
	}),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$lib: 'src/lib',
			$utils: 'src/utils',
			$components: 'src/components',
			$types: 'src/types'
		}
	}
};

export default config;
