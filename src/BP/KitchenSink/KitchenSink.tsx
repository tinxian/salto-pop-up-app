import { createBottomTabNavigator } from 'react-navigation'
import { ComponentsNavigator } from './screens/Components/Components'
import { ServicesScreen } from './screens/Services/Services'
import { LibrariesScreen } from './screens/Libraries/Libraries'

export const KitchenSinkTabView = createBottomTabNavigator({
    Components: {
        screen: ComponentsNavigator,
        navigationOptions: {
            title: 'Components',
        },
    },
    Services: {
        screen: ServicesScreen,
        navigationOptions: {
            title: 'Services',
        },
    },
    Libraries: {
        screen: LibrariesScreen,
        navigationOptions: {
            title: 'Libraries',
        },
    },
})
