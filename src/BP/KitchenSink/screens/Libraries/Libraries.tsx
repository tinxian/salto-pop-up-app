import React from 'react'
import {
   View,
   StyleSheet,
   StyleProp,
   Text,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}

// tslint:disable:jsx-use-translation-function
export class LibrariesScreen extends React.Component<Props, State> {

    public render() {
        return (
            <View style={this.getStyles()}>
                <Text style={{ marginBottom: 24 }}>Libraries</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
