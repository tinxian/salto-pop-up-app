import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, FlatList, Image, Dimensions, TouchableOpacity, Linking, Platform } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { OtherEventType } from 'src/services/theme';
import { HeaderNavigation } from 'src/components/core/Navigation/HeaderNavigation';
import { getIcon } from 'src/utils/icons';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {

}

export const OtherEventsScreen = withThemeContext(
    class OtherEventsScreen extends React.Component<Props & ThemeInjectedProps, State> {

        public render() {
            const { themeContext, navigation } = this.props

            return (
                <>
                    <HeaderNavigation navigation={navigation} title={'Andere evenementen'} />
                    <View style={this.getStyles()}>

                        <FlatList<OtherEventType>
                            contentContainerStyle={this.getWrapperStyles()}
                            data={themeContext.theme.content.OtherEvents}
                            renderItem={item => this.renderItem(item.item)}
                            keyExtractor={item => item.title}
                        />
                    </View>
                </>
            )
        }

        private renderItem(item: OtherEventType) {
            const { themeContext } = this.props
            return (
                <TouchableOpacity onPress={() => this.handleItemPress(item)}>
                    <View style={styles.itemContainer}>
                        <Image
                            style={styles.itemLogo}
                            source={{ uri: item.logo }}
                        />
                        <View style={styles.labelContainer}>
                            <Text style={this.getTitleStyles()}>
                                {item.title}
                            </Text>
                            <Text style={this.getSubtitleStyles()}>
                                {item.subtitle}
                            </Text>
                        </View>
                        <Icon
                            name={getIcon('download')}
                            color={themeContext.theme.colors.RadioPlayerControlsColor}
                            size={33}
                        />
                    </View>
                </TouchableOpacity>

            )
        }

        private handleItemPress = (item: OtherEventType) => {
            const url = Platform.OS === 'android' ? item.androidLink : item.iosLink
            Linking.canOpenURL(url)
                .then(supported => {
                    if (!supported) {
                        console.log("Can't handle url: " + url);
                        return
                    }
                    return Linking.openURL(url);
                })
                .catch(err => console.error('An error occurred', err));
        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
            ]
        }

        private getTitleStyles() {
            const { TextColor } = this.props.themeContext.theme.colors
            return [
                { color: TextColor },
                styles.label,
            ]
        }

        private getSubtitleStyles() {
            const { TextColor } = this.props.themeContext.theme.colors
            return [
                { color: TextColor },
                styles.subtitle,
            ]
        }

        private getStyles() {
            const { style, themeContext } = this.props
            return [
                styles.container,
                { backgroundColor: themeContext.theme.colors.PageBackgroundColor },
                style,
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',

    },
    labelContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 10,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '50%',
    },
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    itemLogo: {
        width: 80,
        height: 80,
    },
    content: {
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
