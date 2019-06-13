import * as React from 'react'
import { StyleProp, StyleSheet, View, Text } from 'react-native'

interface Props {
    style?: StyleProp<{}>,
    text: string
    backgroundColor: string
    borderColor: string
}

export class Label extends React.Component<Props, {}> {
    public render() {
        const { text } = this.props
        return (
            <View style={this.getStyles()}>
                <Text numberOfLines={1} style={this.getTextStyles()} >{text}</Text>
            </View>
        )
    }

    private getStyles() {
        const { style, backgroundColor, borderColor = 'red' } = this.props

        return [
            styles.container,
            {
                borderColor: borderColor,
                backgroundColor: backgroundColor,

            },
            style,
        ]
    }

    private getTextStyles() {
        const { borderColor = 'red' } = this.props
        return [
            { color: borderColor },
            styles.text,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
    },
    text: {
        lineHeight: 14,
        fontSize: 14,
        fontWeight: '600',
    },
})
