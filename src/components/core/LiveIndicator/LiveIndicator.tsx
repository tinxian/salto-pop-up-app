

import * as React from 'react'
import { StyleProp, StyleSheet, View, Text } from 'react-native'

interface Props {
    style?: StyleProp<{}>,
}

export class LiveIndicator extends React.Component<Props, {}> {
    public render() {

        return (
            <View style={this.getStyles()} >
                <Text style={styles.text}>live</Text>
            </View>
        )
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
