import * as React from 'react';
import { Dimensions, FlatList, Image, Linking, StatusBar, StyleProp, StyleSheet, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationScreenProps } from 'react-navigation';
import { PageHeader } from 'src/components/core/Header/PageHeader';
import { Logo } from 'src/components/core/Logo/Logo';
import { Title } from 'src/components/core/Typography/Title';
import { EventMetaWidget } from 'src/components/implementations/Widgets/EventMetaWidget/EventMetaWidget';
import { ThemeInjectedProps, withThemeContext } from 'src/providers/ThemeProvider';
import { AnalyticsData } from 'src/services/Analytics';
import { openPlatformSpecificWebViews } from 'src/services/Browser';
import { LinkType } from 'src/services/theme';
import { getIcon } from 'src/utils/icons';

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {

}

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
                    <FlatList<LinkType>
                        ListHeaderComponent={() => (
                            <PageHeader titles={[{ title: `Meer` }]} theme={theme} />
                        )}
                        ListFooterComponent={this.renderFooter()}
                        contentContainerStyle={this.getWrapperStyles()}
                        data={theme.links}
                        renderItem={item => this.renderItem(item.item)}
                        keyExtractor={(item, index) => item.link}
                    />
                </View>
            )
        }

        private renderItem(link: LinkType) {
            const { colors } = this.props.themeContext.theme

            if (link.whitespace) {
                return <View style={{ height: 42 }} />
            }

            return (
                <TouchableHighlight onPress={() => this.handleOpenUrl(link)}>
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
            )
        }

        private renderFooter() {
            const { themeContext } = this.props

            return (
                <EventMetaWidget
                    style={{ marginTop: 26 }}
                    themeContext={themeContext}
                />

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
        paddingBottom: 80,
        borderRadius: 25,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
