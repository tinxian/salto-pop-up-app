import * as React from 'react'
import { View, StyleSheet, StyleProp, FlatList, ActivityIndicator, StatusBar, Image, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { Title, TitleSizeType } from 'src/components/core/Typography/Title'
import { LivestreamItem } from 'src/components/implementations/LivestreamItem/LivestreamItem'
import { isWithinRange } from 'date-fns'
import { withVideosContext, VideosInjectedProps } from 'src/providers/VideosProvider'
import { EmptyComponent } from 'src/components/core/EmptyComponent/EmptyComponent'

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

export const OnDemandListScreen = withThemeContext(withVideosContext(
    class OnDemandListScreen extends React.Component<Props & ThemeInjectedProps & VideosInjectedProps, {}> {

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
                    <Image style={styles.logo} source={require('../../../../src/assets/images/logos/salto.png')} />
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
                        <React.Fragment>
                            <View style={styles.titleContainer}>
                                <Title
                                    size={TitleSizeType.large}
                                    color={theme.colors.TitleColor}
                                >
                                    Videos
                                </Title>
                            </View>
                            {this.renderPinnedMedia()}
                            {this.renderLoading()}
                        </React.Fragment>
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
                <LivestreamItem
                    theme={theme}
                    title={`${theme.content.general.EventName} live`}
                    onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                    thumbnail={theme.images.defaultThumbnail}
                />
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

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
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
        position: 'absolute',
        top: 60,
        left: 12,
    },
    content: {
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 12,
        borderRadius: 25,
        marginTop: 100,
        paddingBottom: 100,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
