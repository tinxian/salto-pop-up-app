import { Platform } from "react-native";

export enum PlatformIconType {
    md = 'md',
    ios = 'ios'
}

export function getIcon(icon: string, platform?: PlatformIconType) {
    if (icon.includes('logo-')) {
        return icon
    }
    const prefix = Platform.OS === 'ios' ? 'ios' : 'md'

    return `${platform ? platform : prefix}-${icon}`
}
