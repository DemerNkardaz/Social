export function IconResolver(componentName: string) {
	if (!componentName.startsWith('Icon')) return

	const iconName = componentName.slice(4).toLowerCase()

	return {
		name: 'default',
		from: `@/assets/images/icons/${iconName}.svg?component`,
	}
}
