import { createStackNavigator, createBottomTabNavigator, NavigationScreenProps, SafeAreaView } from 'react-navigation'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { HomeScreen } from './screens/Home/HomeScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'
import { LivestreamVideoScreen } from './screens/LiveStream/LivestreamVideoScreen';
import { MoreScreen } from './screens/More/MoreScreen';
import { SaltoTabBarBottom } from './components/core/Navigation/SaltoTabBarBottom';
import React from 'react';

const OnDemandVideo = createStackNavigator({
    OnDemandVideoListScreen: {
        screen: OnDemandListScreen,
        navigationOptions: {
            header: null,
        },
    },
})

const TabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            // gesturesEnabled: false,
            header: null,
        },
    },
    OnDemandVideo: {
        screen: OnDemandVideo,
        navigationOptions: {
            // gesturesEnabled: false,
            header: null,
        },
    },
    MoreScreen: {
        screen: MoreScreen,
        navigationOptions: {
            // gesturesEnabled: false,
            header: null,
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

export class TabNavigatorComponent extends React.Component<NavigationScreenProps, {}> {
    private static router = TabNavigator.router
    public render() {
        const { navigation } = this.props
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TabNavigator navigation={navigation} />
            </SafeAreaView>
        )
    }
}


export const RootNavigator = createStackNavigator({
    Main: {
        screen: TabNavigatorComponent,
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