import { defineConfig } from 'unocss'

function fluidRem(px: number) {
	return `${px / 16}rem`
}

const pxToRem = ([, d]: RegExpMatchArray) => fluidRem(Number(d))

export default defineConfig({
	rules: [
		// ─── Positioning ───────────────────────────────────────────
		[/^top-(\d+)px$/, ([, d]) => ({ top: fluidRem(Number(d)) })],
		[/^bottom-(\d+)px$/, ([, d]) => ({ bottom: fluidRem(Number(d)) })],
		[/^left-(\d+)px$/, ([, d]) => ({ left: fluidRem(Number(d)) })],
		[/^right-(\d+)px$/, ([, d]) => ({ right: fluidRem(Number(d)) })],
		[/^inset-(\d+)px$/, ([, d]) => ({ inset: fluidRem(Number(d)) })],
		[/^inset-x-(\d+)px$/, ([, d]) => ({ left: fluidRem(Number(d)), right: fluidRem(Number(d)) })],
		[/^inset-y-(\d+)px$/, ([, d]) => ({ top: fluidRem(Number(d)), bottom: fluidRem(Number(d)) })],

		// ─── Sizing ────────────────────────────────────────────────
		[/^w-(\d+)px$/, ([, d]) => ({ width: fluidRem(Number(d)) })],
		[/^h-(\d+)px$/, ([, d]) => ({ height: fluidRem(Number(d)) })],
		[/^size-(\d+)px$/, ([, d]) => ({ width: fluidRem(Number(d)), height: fluidRem(Number(d)) })],
		[/^min-w-(\d+)px$/, ([, d]) => ({ 'min-width': fluidRem(Number(d)) })],
		[/^max-w-(\d+)px$/, ([, d]) => ({ 'max-width': fluidRem(Number(d)) })],
		[/^min-h-(\d+)px$/, ([, d]) => ({ 'min-height': fluidRem(Number(d)) })],
		[/^max-h-(\d+)px$/, ([, d]) => ({ 'max-height': fluidRem(Number(d)) })],

		// ─── Margin ────────────────────────────────────────────────
		[/^m-(\d+)px$/, ([, d]) => ({ margin: fluidRem(Number(d)) })],
		[/^mx-(\d+)px$/, ([, d]) => ({ 'margin-left': fluidRem(Number(d)), 'margin-right': fluidRem(Number(d)) })],
		[/^my-(\d+)px$/, ([, d]) => ({ 'margin-top': fluidRem(Number(d)), 'margin-bottom': fluidRem(Number(d)) })],
		[/^mt-(\d+)px$/, ([, d]) => ({ 'margin-top': fluidRem(Number(d)) })],
		[/^mb-(\d+)px$/, ([, d]) => ({ 'margin-bottom': fluidRem(Number(d)) })],
		[/^ml-(\d+)px$/, ([, d]) => ({ 'margin-left': fluidRem(Number(d)) })],
		[/^mr-(\d+)px$/, ([, d]) => ({ 'margin-right': fluidRem(Number(d)) })],

		// ─── Padding ───────────────────────────────────────────────
		[/^p-(\d+)px$/, ([, d]) => ({ padding: fluidRem(Number(d)) })],
		[/^px-(\d+)px$/, ([, d]) => ({ 'padding-left': fluidRem(Number(d)), 'padding-right': fluidRem(Number(d)) })],
		[/^py-(\d+)px$/, ([, d]) => ({ 'padding-top': fluidRem(Number(d)), 'padding-bottom': fluidRem(Number(d)) })],
		[/^pt-(\d+)px$/, ([, d]) => ({ 'padding-top': fluidRem(Number(d)) })],
		[/^pb-(\d+)px$/, ([, d]) => ({ 'padding-bottom': fluidRem(Number(d)) })],
		[/^pl-(\d+)px$/, ([, d]) => ({ 'padding-left': fluidRem(Number(d)) })],
		[/^pr-(\d+)px$/, ([, d]) => ({ 'padding-right': fluidRem(Number(d)) })],

		// ─── Typography ────────────────────────────────────────────
		[/^text-(\d+)px$/, ([, d]) => ({ 'font-size': fluidRem(Number(d)) })],
		[/^leading-(\d+)px$/, ([, d]) => ({ 'line-height': fluidRem(Number(d)) })],
		[/^tracking-(\d+)px$/, ([, d]) => ({ 'letter-spacing': fluidRem(Number(d)) })],
		[/^indent-(\d+)px$/, ([, d]) => ({ 'text-indent': fluidRem(Number(d)) })],
		[/^word-spacing-(\d+)px$/, ([, d]) => ({ 'word-spacing': fluidRem(Number(d)) })],

		// ─── Border ────────────────────────────────────────────────
		[/^border-(\d+)px$/, ([, d]) => ({ 'border-width': fluidRem(Number(d)) })],
		[/^border-t-(\d+)px$/, ([, d]) => ({ 'border-top-width': fluidRem(Number(d)) })],
		[/^border-b-(\d+)px$/, ([, d]) => ({ 'border-bottom-width': fluidRem(Number(d)) })],
		[/^border-l-(\d+)px$/, ([, d]) => ({ 'border-left-width': fluidRem(Number(d)) })],
		[/^border-r-(\d+)px$/, ([, d]) => ({ 'border-right-width': fluidRem(Number(d)) })],
		[/^rounded-(\d+)px$/, ([, d]) => ({ 'border-radius': fluidRem(Number(d)) })],
		[/^rounded-tl-(\d+)px$/, ([, d]) => ({ 'border-top-left-radius': fluidRem(Number(d)) })],
		[/^rounded-tr-(\d+)px$/, ([, d]) => ({ 'border-top-right-radius': fluidRem(Number(d)) })],
		[/^rounded-bl-(\d+)px$/, ([, d]) => ({ 'border-bottom-left-radius': fluidRem(Number(d)) })],
		[/^rounded-br-(\d+)px$/, ([, d]) => ({ 'border-bottom-right-radius': fluidRem(Number(d)) })],
		[/^rounded-t-(\d+)px$/, ([, d]) => ({ 'border-top-left-radius': fluidRem(Number(d)), 'border-top-right-radius': fluidRem(Number(d)) })],
		[/^rounded-b-(\d+)px$/, ([, d]) => ({ 'border-bottom-left-radius': fluidRem(Number(d)), 'border-bottom-right-radius': fluidRem(Number(d)) })],
		[/^rounded-l-(\d+)px$/, ([, d]) => ({ 'border-top-left-radius': fluidRem(Number(d)), 'border-bottom-left-radius': fluidRem(Number(d)) })],
		[/^rounded-r-(\d+)px$/, ([, d]) => ({ 'border-top-right-radius': fluidRem(Number(d)), 'border-bottom-right-radius': fluidRem(Number(d)) })],

		// ─── Gap / Flexbox / Grid ──────────────────────────────────
		[/^gap-(\d+)px$/, ([, d]) => ({ gap: fluidRem(Number(d)) })],
		[/^gap-x-(\d+)px$/, ([, d]) => ({ 'column-gap': fluidRem(Number(d)) })],
		[/^gap-y-(\d+)px$/, ([, d]) => ({ 'row-gap': fluidRem(Number(d)) })],
		[/^basis-(\d+)px$/, ([, d]) => ({ 'flex-basis': fluidRem(Number(d)) })],

		// ─── Effects ───────────────────────────────────────────────
		[/^shadow-(\d+)px$/, ([, d]) => ({ 'box-shadow': `0 ${fluidRem(Number(d))} ${fluidRem(Number(d) * 2)} 0 rgb(0 0 0 / 0.1)` })],
		[/^blur-(\d+)px$/, ([, d]) => ({ filter: `blur(${fluidRem(Number(d))})` })],
		[/^outline-(\d+)px$/, ([, d]) => ({ 'outline-width': fluidRem(Number(d)) })],
		[/^ring-(\d+)px$/, ([, d]) => ({ 'box-shadow': `0 0 0 ${fluidRem(Number(d))} currentColor` })],

		// ─── Transform ─────────────────────────────────────────────
		[/^translate-x-(\d+)px$/, ([, d]) => ({ transform: `translateX(${fluidRem(Number(d))})` })],
		[/^translate-y-(\d+)px$/, ([, d]) => ({ transform: `translateY(${fluidRem(Number(d))})` })],
		[/^-translate-x-(\d+)px$/, ([, d]) => ({ transform: `translateX(-${fluidRem(Number(d))})` })],
		[/^-translate-y-(\d+)px$/, ([, d]) => ({ transform: `translateY(-${fluidRem(Number(d))})` })],

		// ─── Columns / Scroll ──────────────────────────────────────
		[/^columns-(\d+)px$/, ([, d]) => ({ columns: fluidRem(Number(d)) })],
		[/^scroll-m-(\d+)px$/, ([, d]) => ({ 'scroll-margin': fluidRem(Number(d)) })],
		[/^scroll-p-(\d+)px$/, ([, d]) => ({ 'scroll-padding': fluidRem(Number(d)) })],
	],
})
