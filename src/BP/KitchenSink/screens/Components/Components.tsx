import React from 'react'
import {
   StyleProp,
   Text,
   FlatList,
} from 'react-native'
import { NavigationScreenProps, createStackNavigator } from 'react-navigation'
import { ButtonsView } from './Buttons/ButtonsView'
import { InputsView } from './Inputs/InputsView'
import { ListItem } from 'src/BP/Components/List/ListItem'
import { Separator } from 'src/BP/Components/List/Separator'
import { BackgroundsView } from './Backgrounds/BackgroundsView'
import { IconsView } from './Icons/IconsView'
import { ImageView } from './Images/ImageView'
import { SwiperView } from './Swiper/SwiperView'
import { ToggleView } from './Toggle/ToggleView'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}

interface ComponentItem {
    title: string
    screen: string
}

// tslint:disable:jsx-use-translation-function
class ComponentsScreen extends React.Component<Props, State> {

    private components?: ComponentItem[] = [
        { title: 'Buttons', screen: 'Buttons' },
        { title: 'Inputs', screen: 'Inputs' },
        { title: 'Backgrounds', screen: 'Backgrounds' },
        { title: 'Icons', screen: 'Icons' },
        { title: 'Image', screen: 'Images' },
        { title: 'Swiper', screen: 'Swiper' },
        { title: 'Toggle', screen: 'Toggle' },
    ]

    public render() {
        return (
            <FlatList<ComponentItem>
                keyboardShouldPersistTaps={'always'}
                data={this.components || []}
                ItemSeparatorComponent={
                    () => <Separator />
                }
                renderItem={({ item, index }) => (
                    <ListItem
                        label={item.title}
                        onPress={() => this.props.navigation.navigate(item.screen)}
                    />
                )}
                ListEmptyComponent={
                    <Text>empty component</Text> // TODO: make emptystate
                }
                keyExtractor={(item, i) => `${i}-${item.title}`}
            />
        )
    }
}

export const ComponentsNavigator = createStackNavigator({
    Home: {
        screen: ComponentsScreen,
        navigationOptions: {
            title: 'Components',
        },
    },
    Buttons: {
        screen: ButtonsView,
        navigationOptions: {
            title: 'Buttons',
        },
    },
    Inputs: {
        screen: InputsView,
        navigationOptions: {
            title: 'Inputs',
        },
    },
    Backgrounds: {
        screen: BackgroundsView,
        navigationOptions: {
            title: 'Backgrounds',
        },
    },
    Icons: {
        screen: IconsView,
        navigationOptions: {
            title: 'Icons',
        },
    },
    Images: {
        screen: ImageView,
        navigationOptions: {
            title: 'Image',
        },
    },
    Swiper: {
        screen: SwiperView,
        navigationOptions: {
            title: 'Slideshow',
        },
    },
    Toggle: {
        screen: ToggleView,
        navigationOptions: {
            title: 'Toggle',
        },
    },
})
