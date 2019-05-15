

import * as React from 'react'
import { StyleProp, StyleSheet, View, Text } from 'react-native'

interface Props {
    style?: StyleProp<{}>,
    color: string,
    textColor: string
}

export class LiveIndicator extends React.Component<Props, {}> {
    public render() {
        return (
            <View style={this.getStyles()} >
                <Text style={this.getTextStyles()}>live</Text>
            </View>
        )
    }

    private getTextStyles() {
        const { textColor } = this.props

        return [
            styles.text,
            { color: textColor }
        ]
    }

    private getStyles() {
        const { style } = this.props

        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        padding: 4,
        backgroundColor: 'red',
    },
    text: {
        color: "#ffffff",
    },
})
