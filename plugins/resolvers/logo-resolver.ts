export function LogoResolver(componentName: string) {
	if (!componentName.startsWith('Logo')) return

	const iconName = componentName.slice(4).toLowerCase()

	return {
		name: 'default',
		from: `@/assets/images/socials/${iconName}.svg`,
	}
}
