import * as React from 'react'
import { StyleProp, StyleSheet, View, Text } from 'react-native'

interface Props {
    style?: StyleProp<{}>,
    text: string
    color?: string
    textColor?: string
}

export class Label extends React.Component<Props, {}> {
    public render() {
        const { text } = this.props
        return (
            <View style={this.getStyles()}>
                <Text style={this.getTextStyles()} >{text}</Text>
            </View>
        )
    }

    private getStyles() {
        const { style, color = 'red' } = this.props

        return [
            styles.container,
            { backgroundColor: color },
            style,
        ]
    }

    private getTextStyles() {
        const { textColor = '#ffffff' } = this.props
        return [
            { color: textColor },
            styles.text,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingHorizontal: 31,
        paddingVertical: 5,
        borderRadius: 8,
    },
    text: {
        lineHeight: 23,
        fontSize: 18,
        fontWeight: '600',
    },
})
