import React from 'react'
import { StyleProp, Text, StyleSheet, TextProps } from 'react-native';

interface Props extends TextProps {
    textStyle?: StyleProp<{}>
    size?: TitleSizeType
    color: string
}

export enum TitleSizeType {
    large = 'large',
    medium = 'medium',
}

export class Title extends React.Component<Props, {}> {
    public render() {
        return (
            <Text style={this.getStyles()} {...this.props}>
                {this.props.children}
            </Text>
        )
    }

    private getStyles() {
        const { textStyle, size, color } = this.props
        return [
            styles.container,
            size === TitleSizeType.large && { fontSize: 24 },
            { color },
            textStyle,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        fontWeight: '700',
    }
})
