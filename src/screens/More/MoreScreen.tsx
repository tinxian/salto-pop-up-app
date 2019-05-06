import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, FlatList, TouchableHighlight } from 'react-native'
import { getIcon } from 'src/utils/icons';
import { NavigationScreenProps } from 'react-navigation';
import { Title } from 'src/components/core/Navigation/NavigationIcon';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {

}

interface MoreItem {
    screen: string
    label: string
    icon: string
}

const moreItems: MoreItem[] = [
    { screen: 'Settings', label: 'Instellingen', icon: getIcon('settings') },
    { screen: 'Events', label: 'Andere evenementen', icon: getIcon('megaphone') },
]

export class MoreScreen extends React.Component<Props, State> {

    public render() {
        return (
            <View style={this.getStyles()}>
                <FlatList<MoreItem>
                    ListHeaderComponent={() => (
                        <View style={styles.header}>

                            <Title>Meer</Title>
                        </View>
                    )}
                    data={moreItems}
                    renderItem={item => this.renderItem(item.item)}
                    keyExtractor={item => item.label}
                />
            </View>
        )
    }

    private renderItem(item: MoreItem) {
        return (
            <TouchableHighlight onPress={() => this.onItemPress(item)}>
                <View style={styles.itemContainer}>
                    <Icon
                        name={item.icon}
                        color={'#000'}
                        size={25}
                    />
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>
                            {item.label}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    private onItemPress = (item: MoreItem) => {
        const { navigation } = this.props

        navigation.navigate(item.screen)

    }

    private getStyles() {
        const { style } = this.props
        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 22,
        height: 44,
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContainer: {
        height: 44,
        flex: 1,
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',

    },
    labelContainer: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        marginLeft: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
    }
})
