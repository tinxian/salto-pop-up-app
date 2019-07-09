import { format } from 'date-fns';
import * as React from 'react';
import { AppState, AppStateStatus, FlatList, StatusBar, StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationScreenProps } from 'react-navigation';
import { ExpandableRotationContainer } from 'src/components/core/Animation/ExpandableRotationContainer';
import { EmptyComponent } from 'src/components/core/EmptyComponent/EmptyComponent';
import VideoPlayer from 'src/components/core/react-native-video-controls/Videoplayer';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { SubTitle } from 'src/components/core/Typography/SubTitle';
import { Title } from 'src/components/core/Typography/Title';
import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem';
import { ThemeInjectedProps, withThemeContext } from 'src/providers/ThemeProvider';
import { VideosInjectedProps, withVideosContext } from 'src/providers/VideosProvider';
import { AnalyticsData } from 'src/services/Analytics';
import { Media } from 'src/services/media';
import { EpisodeType } from 'src/services/videos';
import { getMillisecondsInMinutes } from 'src/utils/date';
import { getIcon, PlatformIconType } from 'src/utils/icons';

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
    metaExpand: boolean
    appState: AppStateStatus
    paused: boolean
}

export const OnDemandVideoScreen = withThemeContext(withVideosContext(
    class OnDemandVideoScreen extends React.Component<Props & ThemeInjectedProps & VideosInjectedProps, State> {
        public state: State = {
            loading: true,
            fullScreen: false,
            metaExpand: false,
            appState: AppState.currentState,
            paused: false,
        }

        private expandableRotationContainerRef: ExpandableRotationContainer | null

        public componentDidMount() {
            AppState.addEventListener('change', this.handleAppStateChange)
            AnalyticsData.trackScreen('Ondemand video screen')
            Media.stopOtherMedia()
        }

        public componentWillUnmount() {
            AppState.removeEventListener('change', this.handleAppStateChange)
        }

        public render() {
            const { theme } = this.props.themeContext
            const item = this.props.navigation.getParam('item')
            const data = this.getRelevantVideosFromEpisode()

            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={true} animated={true} />
                    <ExpandableRotationContainer
                        startHeight={300}
                        style={styles.videoContainer}
                        ref={ref => this.expandableRotationContainerRef = ref}
                    >
                        <VideoPlayer
                            style={{ flex: 1, overlfow: 'hidden' }}
                            source={{ uri: item.streams.mp4 }}
                            playInBackground={false}
                            paused={this.state.paused}
                            onBack={() => this.props.navigation.goBack()}
                            onEnterFullscreen={this.handleFullScreenIn}
                            onExitFullscreen={this.handleFullScreenOut}
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
                this.setState({ paused: true })
            }
            if (nextAppState === 'active') {
                this.setState({ paused: false })
            }
        }

        private handleMetaExpand = () => {
            this.setState({ metaExpand: !this.state.metaExpand })
        }

        private handleFullScreenIn = () => {
            if (this.expandableRotationContainerRef) {
                this.expandableRotationContainerRef.animateIn()
            }
        }

        private handleFullScreenOut = () => {
            if (this.expandableRotationContainerRef) {
                this.expandableRotationContainerRef.animateOut()
            }
        }

        private getShareOptions = () => {
            const item = this.props.navigation.getParam('item')

            return {
                title: item.title,
                message: `Kijk naar deze video van ${item.programName}`,
                url: item.streams.mp4,
                subject: `Kijk naar deze video van ${item.programName}`, //  for email
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
    },
})
