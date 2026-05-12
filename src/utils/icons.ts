export const iconModules = import.meta.glob('@/assets/images/**/*.svg', {
  eager: true,
  import: 'default'
}) as Record<string, Component>

export const getIcon = (name: string, dir: string) => {
  const path = `/src/assets/images/${dir}${name}.svg`
  return iconModules[path] || null
}

export const createIcon = <T extends Record<string, any>>(
  name: string,
  dir: string,
  config: T
): T & { readonly component: Component | null } => {
  return {
    ...config,
    get component() {
      return getIcon(name, dir)
    }
  }
}
