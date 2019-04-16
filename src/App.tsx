import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LocalizationProvider, initializeLocalization } from './services/LocalizationService'
import { Root } from './screens/Root'
import { createAppContainer, NavigationScreenProp, NavigationRouter, createBottomTabNavigator } from 'react-navigation'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'
import { LiveStreamScreen } from './screens/LiveStreamScreen/LiveStreamScreen'
import { RadioScreen } from './screens/RadioScreen/RadioScreen'
import { withThemeContext, ThemeInjectedProps } from './providers/ThemeProvider';


const RootNavigator = createBottomTabNavigator({
    Root,
    KitchenSink: {
        screen: OnDemandVideoScreen,
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

export const AppProviders = withThemeContext( // TODO: example remove this
    class AppProviders extends React.Component<{ navigation: NavigationScreenProp<{}> } & ThemeInjectedProps> {
        public static router: NavigationRouter<{}, {}> = RootNavigator.router

        public render() {

            return (
                <View style={styles.container}>
                    <LocalizationProvider initialize={initializeLocalization}>
                        <RootNavigator
                            navigation={this.props.navigation}
                        />
                    </LocalizationProvider>
                </View>
            )
        }
    })

export const App = createAppContainer(AppProviders)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
