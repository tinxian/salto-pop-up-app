import { createStackNavigator, createBottomTabNavigator, NavigationScreenProp, NavigationRouter } from 'react-navigation'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { RadioScreen } from './screens/RadioScreen/RadioScreen'
import { LiveStreamScreen } from './screens/LiveStreamScreen/LiveStreamScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'
import { withThemeContext, ThemeInjectedProps } from './providers/ThemeProvider'
import React from 'react'

const OnDemandVideo = createStackNavigator({
    OnDemandVideoListScreen: {
        screen: OnDemandListScreen,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
})

const TabNavigator = createBottomTabNavigator({
    OnDemandVideo: {
        screen: OnDemandVideo,
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
})

export const TabNavigatorScreen = withThemeContext( // TODO: example remove this
    class TabNavigatorScreen extends React.Component<{ navigation: NavigationScreenProp<{}> } & ThemeInjectedProps> {
        public static router: NavigationRouter<{}, {}> = TabNavigator.router

        public render() {
            return (
                <TabNavigator
                    navigation={this.props.navigation}
                />
            )
        }

    })


export const RootNavigator = createStackNavigator({
    Main: {
        screen: TabNavigatorScreen,
    },


    OnDemandVideoScreen: {
        screen: OnDemandVideoScreen,
        navigationOptions: {
            header: null,

        },
    },

}, {
        headerMode: 'none',

    })