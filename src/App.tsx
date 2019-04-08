import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LocalizationProvider, initializeLocalization } from './services/LocalizationService'
import { Root } from './screens/Root'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { KitchenSinkTabView } from './BP/KitchenSink/KitchenSink'
import { ThemeProvider } from './providers/ThemeProvider';

const RootNavigator = createStackNavigator({
    Root,
    KitchenSink: {
        screen: KitchenSinkTabView,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
}, {
        headerMode: 'none',
        mode: 'modal',
    })

export class AppProviders extends React.Component<{ navigation: any }> {

    public static router: any = RootNavigator.router

    public render() {
        return (
            <View style={styles.container}>
                <LocalizationProvider initialize={initializeLocalization}>
                    <ThemeProvider>
                        <RootNavigator navigation={this.props.navigation} />
                    </ThemeProvider>
                </LocalizationProvider>
            </View>
        )
    }
}

export const App = createAppContainer(AppProviders)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
