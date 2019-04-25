import * as React from 'react'
import { View, StyleSheet, StyleProp, Text } from 'react-native'

interface Props {
    style: StyleProp<{}>
}

interface State {

}

export class MoreScreen extends React.Component<Props, State> {

    public render() {
        return (
            <View style={this.getStyles()}>
                <Text>WIP</Text>
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
        flex: 1,
    },
})
