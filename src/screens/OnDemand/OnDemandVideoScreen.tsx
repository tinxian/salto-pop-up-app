import * as React from 'react'
import { View, StyleSheet, StyleProp, StatusBar, Dimensions, FlatList, TouchableOpacity, AppState, AppStateStatus } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { EpisodeType } from 'src/services/videos'
import { Title } from 'src/components/core/Typography/Title'
import { ExpandableRotationContainer } from 'src/components/core/Animation/ExpandableRotationContainer';
import Share from 'react-native-share';
import { Media } from 'src/services/media';

import { getIcon, PlatformIconType } from 'src/utils/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { format } from 'date-fns';
import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem';
import { SubTitle } from 'src/components/core/Typography/SubTitle';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { EmptyComponent } from 'src/components/core/EmptyComponent/EmptyComponent';
import { withVideosContext, VideosInjectedProps } from 'src/providers/VideosProvider';
import { AnalyticsData } from 'src/services/Analytics';
import { getMillisecondsInMinutes } from 'src/utils/date';
import VideoPlayer from 'src/components/core/react-native-video-controls/VideoPlayer';

interface Params {
    item: EpisodeType,
}

interface Props extends NavigationScreenProps<Params> {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loading: boolean
    fullScreen: boolean
    height: number
    metaExpand: boolean
    appState: AppStateStatus
    paused: boolean
}
export const OnDemandVideoScreen = withThemeContext(withVideosContext(
    class OnDemandVideoScreen extends React.Component<Props & ThemeInjectedProps & VideosInjectedProps, State> {
        public state: State = {
            loading: true,
            fullScreen: false,
            height: Dimensions.get('window').height,
            metaExpand: false,
            appState: AppState.currentState,
            paused: false,
        }

        public player: VideoPlayer | null

        public componentDidMount() {
            AppState.addEventListener('change', this.handleAppStateChange);
            AnalyticsData.trackScreen('Ondemand video screen')
            Media.stopOtherMedia()
        }

        public componentWillUnmount() {
            AppState.removeEventListener('change', this.handleAppStateChange);
        }

        public render() {
            const { fullScreen } = this.state
            const { theme } = this.props.themeContext
            const item = this.props.navigation.getParam('item')
            const data = this.getRelevantVideosFromEpisode()

            return (
                <View style={this.getStyles()} onLayout={this.handleLayoutChange}>
                    <StatusBar hidden={true} animated={true} />
                    <ExpandableRotationContainer
                        disableAnimation={false}
                        expand={fullScreen}
                        startHeight={300}
                        style={styles.videoContainer}
                    >
                        <VideoPlayer
                            style={{ flex: 1, overflow: 'hidden' }}
                            ref={(ref: VideoPlayer) => this.player = ref}
                            source={{ uri: item.streams.mp4 }}
                            playInBackground={false}
                            paused={this.state.paused}
                            onBack={() => this.props.navigation.goBack()}
                            onEnterFullscreen={this.handleFullScreenToggle}
                            onExitFullscreen={this.handleFullScreenToggle}
                            toggleResizeModeOnFullscreen={false}
                        />
                    </ExpandableRotationContainer>

                    <FlatList
                        ListHeaderComponent={() => this.renderMetaHeader(item)}
                        ListEmptyComponent={() => (
                            <EmptyComponent
                                theme={theme}
                                onPress={() => this.props.videosContext.refresh()}
                            />
                        )}
                        data={data}
                        contentContainerStyle={this.getWrapperStyles()}
                        keyExtractor={item => {
                            return item.id
                        }}
                        renderItem={({ item }) => (
                            <OnDemandVideoItem
                                onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { item, data })}
                                poster={{ uri: item.poster }}
                                theme={theme}
                                title={item.title}
                                programName={item.programName}
                                item={item}
                            />
                        )}
                    />
                </View>
            )
        }

        private renderMetaHeader(item: EpisodeType) {
            const { themeContext } = this.props
            const { metaExpand } = this.state

            return (
                <View>
                    <TouchableOpacity onPress={this.handleMetaExpand}>
                        <View
                            style={styles.titleContainer}
                        >
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Title
                                    color={themeContext.theme.colors.TextColor}
                                    numberOfLines={!metaExpand ? 2 : undefined}
                                >
                                    {item.title}
                                </Title>
                            </View>
                            <View>
                                <View style={styles.shareButton}>
                                    <Icon
                                        name={getIcon('arrow-down')}
                                        color={this.props.themeContext.theme.colors.ButtonColor}
                                        size={25}
                                        style={{ transform: [{ rotate: metaExpand ? '180deg' : '0deg' }] }}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.renderMetaContent()}

                    <View style={styles.metaContainer}>
                        <SubTitle color={themeContext.theme.colors.SubTitleColor}>{format(item.date, 'DD-MM-YYYY')} - {item.programName}</SubTitle>
                        <View style={styles.metaActions}>
                            <TouchableOpacity onPress={this.handleShare}>
                                <View style={styles.shareButton}>
                                    <Icon
                                        name={getIcon('share', PlatformIconType.md)}
                                        color={this.props.themeContext.theme.colors.ButtonColor}
                                        size={25}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Title
                        color={themeContext.theme.colors.TextColor}
                        textStyle={styles.relevantTitle}
                    >
                        Relevante Videos
                    </Title>
                </View>
            )
        }

        private renderMetaContent() {
            const { themeContext } = this.props
            const { metaExpand } = this.state
            const item = this.props.navigation.getParam('item')

            if (!metaExpand) {
                return null
            }

            if (!item.description) {
                return <Paragraph color={themeContext.theme.colors.TextColor}>Geen beschrijving beschikbaar</Paragraph>
            }

            return (
                <Paragraph color={themeContext.theme.colors.TextColor}>{item.description}</Paragraph>
            )
        }

        private handleLayoutChange = () => {
            this.setState({ height: Dimensions.get('window').height })
        }

        private handleShare = () => {
            const item = this.props.navigation.getParam('item')
            AnalyticsData.trackShareClickEvent({
                title: item.title,
                videoDuration: getMillisecondsInMinutes(item.duration),
                url: item.streams.mp4,
                id: item.id,
            })
            Share.open(this.getShareOptions())
        }

        private handleAppStateChange = (nextAppState: any) => {
            this.setState({ appState: nextAppState })
            if (nextAppState === 'background' || 'inactive') {
                this.setState({ paused: true });
            }
            if (nextAppState === 'active') {
                this.setState({ paused: false });
            }
        };

        private handleMetaExpand = () => {
            this.setState({ metaExpand: !this.state.metaExpand })
        }

        private handleFullScreenToggle = () => {
            const { fullScreen } = this.state
            this.setState({ fullScreen: !fullScreen })
        }

        private getShareOptions = () => {
            const item = this.props.navigation.getParam('item')

            return {
                title: item.title,
                message: `Kijk naar deze video van ${item.programName}`,
                url: item.streams.mp4,
                subject: `Kijk naar deze video van ${item.programName}` //  for email
            }
        }

        private getRelevantVideosFromEpisode() {
            const data = this.props.videosContext.episodes
            const item = this.props.navigation.getParam('item')

            return data.filter(i => {
                return i.programName === item.programName && i.id !== item.id
            })

        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
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
))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        paddingHorizontal: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    videoContainer: {
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    loader: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    shareButton: {
        marginLeft: 12,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    metaActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    relevantTitle: {
        marginBottom: 12,
    }
})
