import { format } from 'date-fns'
import * as React from 'react'
import { ActivityIndicator, ScrollView, StatusBar, StyleProp, StyleSheet, TouchableHighlight, View } from 'react-native'
import Share from 'react-native-share'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationScreenProps } from 'react-navigation'
import SocketIOClient from 'socket.io-client'
import { ExpandableRotationContainer } from 'src/components/core/Animation/ExpandableRotationContainer'
import { InformationList } from 'src/components/core/List/InformationList'
import { LiveIndicator } from 'src/components/core/LiveIndicator/LiveIndicator'
import { SubTitle } from 'src/components/core/Typography/SubTitle'
import { Title } from 'src/components/core/Typography/Title'
import { ThemeInjectedProps, withThemeContext } from 'src/providers/ThemeProvider'
import { AnalyticsData } from 'src/services/Analytics'
import { LiveStreamDataType, Media } from 'src/services/media'
import { ScheduleType } from 'src/services/videos'
import { getIcon, PlatformIconType } from 'src/utils/icons'
import VideoPlayer from 'src/components/core/react-native-video-controls/VideoControls'

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loadingInformationList: boolean
    loadingDetail: boolean
    programData?: LiveStreamDataType
    schedule: ScheduleType[]
}

export const LivestreamVideoScreen = withThemeContext(
    class LivestreamVideoScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loadingDetail: true,
            loadingInformationList: true,
            programData: undefined,
            schedule: [],
        }

        private expandableRotationContainerRef: ExpandableRotationContainer | null
        private socket: any

        public async componentDidMount() {
            const { channels } = this.props.themeContext.theme.content
            AnalyticsData.trackScreen('Livestream video screen')
            Media.stopOtherMedia()
            StatusBar.setHidden(true, 'fade')
            this.socket = SocketIOClient('https://api.salto.nl/nowplaying')
            this.socket.emit('join', { channel: channels.LivestreamChannelName })

            // Listens to channel2 and display the data recieved
            this.socket.on('update', (data: LiveStreamDataType) => {
                this.setState({ programData: data, loadingDetail: false })
            })

            const schedule = await Media.getScheduleByChannel(channels.LivestreamChannelName)

            this.setState({ schedule, loadingInformationList: false })
        }

        public componentWillUnmount() {
            StatusBar.setHidden(false, 'fade')
        }

        public render() {
            const { programData } = this.state
            const { themeContext } = this.props

            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={true} animated={true} />
                    <ExpandableRotationContainer
                        startHeight={300}
                        style={styles.videoContainer}
                        ref={ref => this.expandableRotationContainerRef = ref}
                    >
                        <VideoPlayer
                            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
                            source={{ uri: themeContext.theme.content.urls.LivestreamUrl, type: 'm3u8'}}
                            onBack={() => this.props.navigation.goBack()}
                            onEnterFullscreen={this.handleFullScreenIn}
                            onExitFullscreen={this.handleFullScreenOut}
                            disableSeekbar={true}
                            disableTimer={true}
                            disablePlayPause={true}
                            playInBackground={false}
                            toggleResizeModeOnFullscreen={false}
                        />
                        {programData && (
                            <LiveIndicator
                                color={themeContext.theme.colors.RadioPlayerBackgroundColor}
                                textColor={themeContext.theme.colors.LiveIndicatorTextColor}
                                style={styles.liveIndicator}
                            />
                        )}

                    </ExpandableRotationContainer>
                    {this.renderInformation()}
                </View>
            )
        }

        private renderInformation() {
            const { loadingDetail, loadingInformationList, programData, schedule } = this.state
            const { themeContext } = this.props
            if (loadingDetail || !programData) {
                return this.renderLoading()
            }

            return (
                <ScrollView>
                    <View style={styles.meta}>
                        <View style={{ flex: 1 }}>
                            <Title color={themeContext.theme.colors.TextColor} numberOfLines={2} >{programData.title}</Title>
                        </View>
                        <TouchableHighlight onPress={this.handleShare}>
                            <View style={styles.shareButton}>
                                <Icon
                                    name={getIcon('share', PlatformIconType.md)}
                                    color={this.props.themeContext.theme.colors.ButtonColor}
                                    size={25}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.labelWrapper}>
                            <SubTitle color={themeContext.theme.colors.SubTitleColor} >Gestart: {format(programData.time, 'HH:mm')} - {programData.channel}</SubTitle>
                        </View>

                        <InformationList
                            loading={loadingInformationList}
                            data={schedule}
                            theme={themeContext.theme}
                        />
                    </View>
                </ScrollView>

            )
        }

        private renderLoading() {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator />
                </View>
            )
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

        private handleShare = () => {
            Share.open(this.getShareOptions())
        }

        private getShareOptions = () => {

            return {
                title: 'livestream',
                message: `Kijk naar deze video van Salto`,
                url: 'url',
                subject: `Kijk naar deze video van Salto`, //  for email
            }
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
        backgroundColor: 'transparent',
    },
    liveIndicator: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    content: {
        paddingHorizontal: 12,
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    videoContainer: {
        backgroundColor: '#000',
    },
    loader: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    meta: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    shareButton: {
        marginLeft: 12,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
