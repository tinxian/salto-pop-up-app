import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LocalizationProvider, initializeLocalization } from './services/LocalizationService'
import { Root } from './screens/Root'
import { createStackNavigator, createAppContainer, NavigationScreenProp, NavigationRouter } from 'react-navigation'
import { KitchenSinkTabView } from './BP/KitchenSink/KitchenSink'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'
import { LiveStreamScreen } from './screens/LiveStreamScreen/LiveStreamScreen'
import { RadioScreen } from './screens/RadioScreen/RadioScreen'

const RootNavigator = createStackNavigator({
    Root,
    KitchenSink: {
        screen: KitchenSinkTabView,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
    OnDemandList: {
        screen: OnDemandListScreen,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
    LiveStreamScreen: {
        screen: LiveStreamScreen,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
    RadioScreen: {
        screen: RadioScreen,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
    OnDemandVideoScreen: {
        screen: OnDemandVideoScreen,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
}, {
    headerMode: 'none',
    mode: 'modal',
})

export class AppProviders extends React.Component<{ navigation: NavigationScreenProp<{}> }> {

    public static router: NavigationRouter<{}, {}> = RootNavigator.router

    public render() {
        return (
            <View style={styles.container}>
                <LocalizationProvider initialize={initializeLocalization}>
                    <RootNavigator navigation={this.props.navigation} />
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
