import * as React from 'react'
import { View, StyleSheet, StyleProp, FlatList, ActivityIndicator, StatusBar, Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { LivestreamItem } from 'src/components/implementations/LivestreamItem/LivestreamItem'
import { isWithinRange } from 'date-fns'
import { withVideosContext, VideosInjectedProps } from 'src/providers/VideosProvider'
import { EmptyComponent } from 'src/components/core/EmptyComponent/EmptyComponent'
import { AnalyticsData } from 'src/services/Analytics'
import { Logo } from 'src/components/core/Logo/Logo'
import { Paragraph } from 'src/components/core/Typography/Paragraph'
import { TitleSizeType } from 'src/components/core/Typography/Title'
import { ExpandableTitleContainer } from 'src/components/core/ExpandableTitleContainer/ExpandableTitleContainer'

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

export const OnDemandListScreen = withThemeContext(withVideosContext(
    class OnDemandListScreen extends React.Component<Props & ThemeInjectedProps & VideosInjectedProps, {}> {

        public componentDidMount() {
            AnalyticsData.trackScreen('Videos screen')
        }

        public render() {
            const { HeaderBackgroundUrl } = this.props.themeContext.theme.images
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
                    {this.renderList()}
                </View>
            )
        }

        private renderList() {
            const { theme } = this.props.themeContext
            const { episodes, loading } = this.props.videosContext

            return (
                <FlatList
                    ListHeaderComponent={() => (
                        <View style={this.getHeaderStyles()}>
                            {this.renderPinnedMedia()}
                            <View style={styles.videoDescription}>
                                <ExpandableTitleContainer
                                    title={`Meest recente videos`}
                                    renderContent={() => (
                                        <Paragraph color={theme.colors.TextColor} textStyle={{ marginBottom: 12 }}>
                                            {theme.content.general.videosIntroduction}
                                        </Paragraph>
                                    )}
                                    titleSize={TitleSizeType.large}
                                    theme={theme}
                                />
                            </View>

                            {this.renderLoading()}
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <EmptyComponent
                            theme={theme}
                            onPress={() => this.props.videosContext.refresh()}
                        />
                    )
                    }
                    refreshing={loading}
                    contentContainerStyle={this.getWrapperStyles()}
                    data={episodes}
                    keyExtractor={item => {
                        return item.id
                    }}
                    renderItem={({ item }) => (
                        <OnDemandVideoItem
                            onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { item })}
                            poster={{ uri: item.poster }}
                            style={{ paddingHorizontal: 12 }}
                            theme={theme}
                            title={item.title}
                            programName={item.programName}
                            item={item}
                        />
                    )}
                />
            )

        }

        private renderPinnedMedia() {
            const { theme } = this.props.themeContext
            const currentDate = new Date()

            if (!isWithinRange(currentDate, theme.content.App.startDate, theme.content.App.endDate)) {
                return null
            }

            return (
                <View
                    style={styles.topContent}
                >
                    <ExpandableTitleContainer
                        title={`${theme.content.general.EventName} livestream`}
                        renderContent={() => (
                            <Paragraph color={theme.colors.TextColor} textStyle={{ marginBottom: 12 }}>
                                {theme.content.general.livestreamIntroduction}
                            </Paragraph>
                        )}
                        titleSize={TitleSizeType.large}
                        theme={theme}
                    />

                    <LivestreamItem
                        theme={theme}
                        onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                        thumbnail={theme.images.defaultThumbnail}
                    />
                </View>
            )
        }

        private renderLoading() {
            const { loading } = this.props.videosContext
            if (loading) {
                return (
                    <View
                        style={{ paddingTop: 100 }}
                    >
                        <ActivityIndicator />
                    </View>
                )
            }
            return null
        }

        private getBackgroundStyles() {
            const { colors } = this.props.themeContext.theme
            return [
                { backgroundColor: colors.SaltoColor },
                styles.background,
            ]

        }

        private getHeaderStyles() {
            const { colors } = this.props.themeContext.theme
            return [
                {
                    backgroundColor: colors.PageBackgroundColor,
                },
                styles.header,
            ]
        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                {
                    backgroundColor: PageBackgroundColor,
                },
                styles.content,
            ]
        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
                style,
            ]
        }
    }
))

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    topContent: {
        paddingHorizontal: 12,
        paddingBottom: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
    videoDescription: {
        paddingHorizontal: 12,

    },
    header: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    content: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 72,
        paddingBottom: 100,
    },
})
