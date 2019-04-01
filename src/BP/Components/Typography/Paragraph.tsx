import React from 'react'
import {
   StyleSheet,
   StyleProp,
   Text,
   View,
} from 'react-native'

interface Props {
    style?: StyleProp<{}>
}

interface State {}

export class Paragraph extends React.Component<Props, State> {

    public render() {
        return (
            <View style={this.getStyles()}>
                <Text style={styles.title}>
                    {this.props.children}
                </Text>

            </View>
        )
    }

    private getStyles(): StyleProp<{}> {
        const { style } = this.props

        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    title: {
        color: '#000',
    },
})
