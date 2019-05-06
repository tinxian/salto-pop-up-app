import { Platform } from 'react-native'

export enum EmptyStateIconTypes {
    empty = require('../assets/icons/cross-small.png'),
}

export enum NavigationIconTypes {
    home = require('../assets/icons/cross-small.png'),
}

export const IconType = {
    emptyState: EmptyStateIconTypes,
    navigation: NavigationIconTypes,
}

export function getIcon(icon: string) {
    const prefix = Platform.OS === 'ios' ? 'ios' : 'md'

    return `${prefix}-${icon}`
}
