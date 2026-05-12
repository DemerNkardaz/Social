
import imageOptimizer from './vite-plugin-image-optimizer.ts'

export default function optimizeImages() {
	return imageOptimizer([
		{
			dirs: ['public/images/backdrops/profile.png'],
			formats: [
				{
					type: 'avif',
					rename: '%name%-1920',
					width: 1920,
					proportional: true,
					compression: { quality: 60, effort: 6 },
				},
				{
					type: 'avif',
					rename: '%name%-2560',
					width: 2560,
					proportional: true,
					compression: { quality: 60, effort: 6 },
				},
				{
					type: 'avif',
					rename: '%name%-3840',
					width: 3840,
					proportional: true,
					compression: { quality: 60, effort: 6 },
				},
				{
					type: 'avif',
					rename: '%name%-7680',
					width: 7680,
					proportional: true,
					compression: { quality: 60, effort: 6 },
				}
			],
		}
	])
}
