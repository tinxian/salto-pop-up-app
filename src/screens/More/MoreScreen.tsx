import * as React from 'react'
import { View, StyleSheet, StyleProp, FlatList, TouchableHighlight, Image, Dimensions, Linking, StatusBar } from 'react-native'
import { getIcon } from 'src/utils/icons'
import { NavigationScreenProps } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { Title } from 'src/components/core/Typography/Title'
import { AnalyticsData } from 'src/services/Analytics';
import { Logo } from 'src/components/core/Logo/Logo';
import { LinkType } from 'src/services/theme';
import { PageHeader } from 'src/components/core/Header/PageHeader';
import { openPlatformSpecificWebViews } from 'src/services/Browser';

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

//    { screen: 'SettingsScreen', label: 'Instellingen', icon: getIcon('settings') },
const moreItems: MoreItem[] = [
    // { screen: 'OtherEventsScreen', label: 'Andere evenementen', icon: getIcon('megaphone') },
]

export const MoreScreen = withThemeContext(
    class MoreScreen extends React.Component<Props & ThemeInjectedProps, State> {

        public componentDidMount() {
            AnalyticsData.trackScreen('More screen')
        }

        public render() {
            const { HeaderBackgroundUrl } = this.props.themeContext.theme.images
            const { theme } = this.props.themeContext
            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={false} animated={false} />
                    <Image
                        style={this.getBackgroundStyles()}
                        source={HeaderBackgroundUrl}
                        resizeMode={'repeat'}
                    />
                    <Logo
                        theme={this.props.themeContext.theme}
                        style={styles.logo}
                        navigation={this.props.navigation}
                    />
                    <FlatList<MoreItem>
                        ListHeaderComponent={() => (
                            <PageHeader theme={theme} title={'Meer'} />
                        )}
                        ListFooterComponent={this.renderFooter()}
                        contentContainerStyle={this.getWrapperStyles()}
                        data={moreItems}
                        renderItem={item => this.renderItem(item.item)}
                        keyExtractor={item => item.label}
                    />
                </View>
            )
        }

        private renderItem(item: MoreItem) {
            const { colors } = this.props.themeContext.theme
            return (
                <TouchableHighlight onPress={() => this.onItemPress(item)}>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 25 }}>
                            <Icon
                                name={item.icon}
                                color={colors.TextColor}
                                size={25}
                            />
                        </View>
                        <View style={this.getLabelContainerStyles()}>
                            <Title color={colors.TextColor}>
                                {item.label}
                            </Title>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }

        private renderFooter() {
            const { links, colors } = this.props.themeContext.theme

            const elements = links.map((link, index) => (
                <TouchableHighlight key={index} onPress={() => this.handleOpenUrl(link)}>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 25 }}>
                            <Icon
                                name={getIcon(link.logo)}
                                color={colors.TextColor}
                                size={25}
                            />
                        </View>
                        <View style={this.getLabelContainerStyles()}>
                            <Title color={colors.TextColor}>
                                {link.title}
                            </Title>
                        </View>
                    </View>
                </TouchableHighlight>
            ))

            return (
                <View style={moreItems.length ? { marginTop: 44 } : undefined}>
                    {elements}
                </View>

            )
        }

        private handleOpenUrl(link: LinkType) {
            const url = link.link

            AnalyticsData.trackSocialLinkEvent({
                title: link.title,
                link: url,
            })

            Linking.canOpenURL(url).then(supported => {
                openPlatformSpecificWebViews(url)
            })
        }

        private onItemPress = (item: MoreItem) => {
            const { navigation } = this.props

            navigation.navigate(item.screen)
        }

        private getLabelContainerStyles() {
            const { colors } = this.props.themeContext.theme
            return [
                { borderColor: colors.SeperatorColor },
                styles.labelContainer,
            ]
        }

        private getBackgroundStyles() {
            const { colors } = this.props.themeContext.theme
            return [
                { backgroundColor: colors.SaltoColor },
                styles.background,
            ]

        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
            ]
        }

        private getStyles() {
            const { style } = this.props
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                styles.container,
                { backgroundColor: PageBackgroundColor },
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
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    labelContainer: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 12,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '50%',
    },
    logo: {
        paddingTop: 15,
        position: 'absolute',
        left: 12,
    },
    content: {
        marginTop: 72,
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 12,
        borderRadius: 25,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
