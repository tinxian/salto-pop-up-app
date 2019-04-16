import { createStackNavigator, createBottomTabNavigator, TabBarBottom } from 'react-navigation'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { RadioScreen } from './screens/RadioScreen/RadioScreen'
import { LiveStreamScreen } from './screens/LiveStreamScreen/LiveStreamScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'

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




export const RootNavigator = createStackNavigator({
    Main: {
        screen: TabNavigator,
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