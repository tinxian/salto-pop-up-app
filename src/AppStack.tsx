import { createStackNavigator, createBottomTabNavigator, NavigationScreenProps } from 'react-navigation'
import { OnDemandVideoScreen } from './screens/OnDemand/OnDemandVideoScreen'
import { HomeScreen } from './screens/Home/HomeScreen'
import { OnDemandListScreen } from './screens/OnDemand/OnDemandListScreen'
import { LivestreamVideoScreen } from './screens/LiveStream/LivestreamVideoScreen'
import { MoreScreen } from './screens/More/MoreScreen'
import { SaltoTabBarBottom } from './components/core/Navigation/SaltoTabBarBottom'
import React from 'react'
import { RadioScreen } from './screens/Radio/RadioScreen'
import { SettingsScreen } from './screens/More/SettingsScreen/SettingsScreen'
import { OtherEventsScreen } from './screens/More/OtherEvents/OtherEventsScreen'

const MoreNavigator = createStackNavigator({
    MoreMainScreen: {
        screen: MoreScreen,
        navigationOptions: {

        },
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {

        },
    },
    OtherEventsScreen: {
        screen: OtherEventsScreen,
        navigationOptions: {

        },
    },
}, {
        headerMode: 'none',
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
        screen: OnDemandListScreen,
        navigationOptions: {
            // gesturesEnabled: false,
            header: null,
        },
    },
    MoreScreen: {
        screen: MoreNavigator,
        navigationOptions: {
            // gesturesEnabled: false,
            header: null,
        },
    },
},
    {
        tabBarOptions: {
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
    public componentDidMount() {
        console.log(TabNavigatorComponent.router)
    }

    public render() {
        const { navigation } = this.props
        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <TabNavigator navigation={navigation} />
            // </SafeAreaView>
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
        },
    },
    LivestreamVideoScreen: {
        screen: LivestreamVideoScreen,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    RadioScreen: {
        screen: RadioScreen,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
}, {
        headerMode: 'none',
        mode: 'modal',
    }
)
