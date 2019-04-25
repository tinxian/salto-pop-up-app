import { createStackNavigator, createBottomTabNavigator, NavigationScreenProps } from 'react-navigation'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { LiveStreamScreen } from './screens/LiveStream/LiveStreamScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'
import { LivestreamVideoScreen } from './screens/LiveStream/LivestreamVideoScreen';
import { MoreScreen } from './screens/More/MoreScreen';
import { SaltoTabBarBottom } from './components/core/Navigation/SaltoTabBarBottom';

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
    MoreScreen: {
        screen: MoreScreen,
        navigationOptions: {
            // gesturesEnabled: false,
        },
    },
},
    {
        tabBarOptions: {
            activeTintColor: '#42f44b',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: {
                backgroundColor: 'transparent',
            },
        },
        defaultNavigationOptions: ({ navigation }: NavigationScreenProps) => ({
            tabBarComponent: SaltoTabBarBottom,
        }),
    } as any // refer to react-navigation createBottomTabNavigator for all possible settings
)


export const RootNavigator = createStackNavigator({
    Main: {
        screen: TabNavigator,
    },
    OnDemandVideoScreen: {
        screen: OnDemandVideoScreen,
        navigationOptions: {
            gesturesEnabled: true,
            mode: 'modal',
        },
    },
    LivestreamVideoScreen: {
        screen: LivestreamVideoScreen,
        navigationOptions: {
            gesturesEnabled: true,
            mode: 'modal',
        },
    },

}, {
        headerMode: 'none',
        mode: 'modal',
    }
)