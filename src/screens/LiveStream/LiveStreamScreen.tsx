import * as React from 'react'
import { View, StyleSheet, StyleProp, Button } from 'react-native'
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export class HomeScreen extends React.Component<Props, State> {
    public render() {
        return (
            <View style={this.getStyles()}>
                <Button title="open livestream" onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')} />
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
