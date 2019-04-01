import React from 'react'
import {
   StyleSheet,
   StyleProp,
   ScrollView,
} from 'react-native'

interface Props {
    style?: StyleProp<{}>
}

interface State {}

export class Page extends React.Component<Props, State> {

    public render() {
        return (
            <ScrollView contentContainerStyle={this.getStyles()}>
                {this.props.children}
            </ScrollView>
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
        flexGrow: 1,
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
})
