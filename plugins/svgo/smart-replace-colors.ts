export function smartReplaceColorsPlugin() {
	return {
		name: 'smartReplaceColors',

		fn: () => {
			const colors = new Set<string>()

			return {
				element: {
					enter: (node: any) => {
						if (node.attributes.fill && node.attributes.fill !== 'none') {
							colors.add(node.attributes.fill)
						}

						if (node.attributes.stroke && node.attributes.stroke !== 'none') {
							colors.add(node.attributes.stroke)
						}

						const style = node.attributes.style

						if (style) {
							const matches = style.match(/(?:fill|stroke):\s*([^;]+)/g)

							matches?.forEach(m => {
								const color = m.split(':')[1].trim()

								if (color !== 'none') {
									colors.add(color)
								}
							})
						}
					},
				},

				root: {
					exit: (node: any) => {
						if (colors.size > 1) return

						const walk = (children: any[]) => {
							children.forEach((child: any) => {
								if (child.type !== 'element') return

								const attrs = child.attributes

								if (attrs.style) {
									attrs.style = attrs.style
										.replace(
											/fill:[^;]+/g,
											'fill:var(--icon-fill, currentColor)',
										)
										.replace(
											/stroke:[^;]+/g,
											'stroke:var(--icon-stroke, currentColor)',
										)
								}

								if (attrs.fill && attrs.fill !== 'none') {
									attrs.fill = 'var(--icon-fill, currentColor)'
								}

								if (attrs.stroke && attrs.stroke !== 'none') {
									attrs.stroke = 'var(--icon-stroke, currentColor)'
								}

								if (child.children) {
									walk(child.children)
								}
							})
						}

						if (node.children) {
							walk(node.children)
						}
					},
				},
			}
		},
	}
}
