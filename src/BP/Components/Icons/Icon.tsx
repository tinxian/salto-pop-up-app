import React from 'react'
import {
    StyleSheet,
    StyleProp,
    Image
} from 'react-native'
import { EmptyStateIconTypes, NavigationIconTypes } from 'src/utils/icons'

interface Props {
    style?: StyleProp<{}>
    type: IconTypes
    color?: string // TODO: force colors.ts instead of string
}

type IconTypes = EmptyStateIconTypes | NavigationIconTypes

interface State {}

export class Icon extends React.Component<Props, State> {
    public render() {
        const { type } = this.props

        return (
            <Image
                style={this.getStyles()}
                source={type}
            />
        )
    }
    private getStyles() {
        const { style, color } = this.props

        return [
            styles.icon,
            style,
            color && { tintColor: color },
        ]
    }
}

const styles = StyleSheet.create({
    icon: {
        //
    },
})
