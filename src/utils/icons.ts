
export enum PlatformIconType {
    md = 'md',
    ios = 'ios'
}

export function getIcon(icon: string, platform?: PlatformIconType) {
    if (icon.includes('logo-')) {
        return icon
    }

    const prefix = 'ios'

    return `${prefix}-${icon}`
}
