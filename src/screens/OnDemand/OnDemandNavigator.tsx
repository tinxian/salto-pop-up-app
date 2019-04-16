import { createStackNavigator } from 'react-navigation'
import { OnDemandList } from './OnDemandList'
import { OnDemandVideoScreen } from './OnDemandVideoScreen'

export const OnDemandNavigator = createStackNavigator({
    OnDemandVideoList: {
        screen: OnDemandList,
        navigationOptions: {
            title: 'video',
            mode: 'modal',
            headerMode: 'none',
        },
    },
    OnDemandVideoScreen: {
        screen: OnDemandVideoScreen,
        navigationOptions: {
            title: 'Components',
            mode: 'modal',
            headerMode: 'none',
        },
    },
})
