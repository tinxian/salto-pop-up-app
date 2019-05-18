import { Platform } from "react-native";

export function getIcon(icon: string) {
    if (icon.includes('logo-')) {
        return icon
    }
    const prefix = Platform.OS === 'ios' ? 'ios' : 'md'

    return `${prefix}-${icon}`
}
