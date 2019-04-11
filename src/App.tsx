import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LocalizationProvider, initializeLocalization } from './services/LocalizationService'
import { Root } from './screens/Root'
import { createStackNavigator, createAppContainer, NavigationScreenProp, NavigationRouter } from 'react-navigation'
import { KitchenSinkTabView } from './BP/KitchenSink/KitchenSink'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { OnDemandList } from './screens/OnDemand/OnDemandList'

const RootNavigator = createStackNavigator({
    Root,
    KitchenSink: {
        screen: KitchenSinkTabView,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
    OnDemandList: {
        screen: OnDemandList,
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
