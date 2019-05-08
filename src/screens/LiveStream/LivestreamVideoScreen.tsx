import * as React from 'react'
import { View, StyleSheet, StyleProp, Button, StatusBar, Dimensions, Text, ScrollView, TouchableHighlight, Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import VideoPlayer from 'react-native-video-controls'
import Video from 'react-native-video'
import { ExpandableContainer } from 'src/components/core/Animation/ExpandableContainer'
import Share from 'react-native-share';
import { Media, LiveStreamDataType } from 'src/services/media';
import { LiveIndicator } from 'src/components/core/LiveIndicator/LiveIndicator';
import SocketIOClient from 'socket.io-client'
import { Title } from 'src/components/core/Typography/Title';
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon } from 'src/utils/icons';
import { format } from 'date-fns';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { Label } from 'src/components/core/Label/Label';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loading: boolean
    fullScreen: boolean
    height: number
    programData?: LiveStreamDataType
}

export const LivestreamVideoScreen = withThemeContext(
    class LivestreamVideoScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loading: true,
            fullScreen: false,
            height: Dimensions.get('window').height,
            programData: undefined,
        }


        public player: Video | null
        private socket: any

        public componentDidMount() {
            Media.stopOtherMedia()
            StatusBar.setHidden(true, 'fade')
            this.socket = SocketIOClient('https://api.salto.nl/nowplaying');
            this.socket.emit('join', { channel: 'salto1' });// emits 'hi server' to your server

            // Listens to channel2 and display the data recieved
            this.socket.on('update', (data: LiveStreamDataType) => {
                console.log(data)
                this.setState({ programData: data })
            });
        }

        public componentWillUnmount() {
            StatusBar.setHidden(false, 'fade')
        }

        public render() {
            const { fullScreen, height, programData } = this.state
            const { themeContext } = this.props


            return (
                <View style={this.getStyles()} onLayout={this.handleLayoutChange}>
                    <StatusBar hidden={true} animated={true} />
                    <ExpandableContainer
                        expand={fullScreen}
                        startHeight={300}
                        maxHeight={height}
                        style={styles.videoContainer}
                    >
                        <VideoPlayer
                            style={{ flex: 1 }}
                            ref={(ref: Video) => this.player = ref}
                            source={{ uri: 'https://media.streamone.net/hlslive/account=AgYIPooZRV0y/livestream=8wJNPcoQbUwW/8wJNPcoQbUwW.m3u8' }}
                            onBack={() => this.props.navigation.goBack()}
                            onEnterFullscreen={this.handleFullScreenToggle}
                            onExitFullscreen={this.handleFullScreenToggle}
                            disableSeekbar={true}
                            disableTimer={true}
                            disablePlayPause={true}
                        />
                        {programData && programData.live && <LiveIndicator style={styles.liveIndicator} />}

                    </ExpandableContainer>


                    {/* <Title numberOfLines={2} >{item.title}</Title> */}
                    {programData && (
                        <ScrollView>
                            <View style={styles.meta}>
                                <View style={{ flex: 1 }}>
                                    <Title numberOfLines={2} >{programData.title}</Title>
                                </View>
                                <Text>Gestart: {format(programData.time, 'HH:mm')}</Text>

                            </View>
                            <View style={styles.content}>
                                <View style={styles.labelWrapper}>
                                    <Label
                                        color={themeContext.theme.LabelColor}
                                        textColor={themeContext.theme.LabelTextColor}
                                        text={programData.channel}
                                    />
                                    <TouchableHighlight onPress={this.handleShare}>
                                        <View style={styles.shareButton}>
                                            <Icon
                                                name={getIcon('share')}
                                                color={this.props.themeContext.theme.ButtonColor}
                                                size={25}
                                            />
                                        </View>
                                    </TouchableHighlight>

                                </View>
                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: programData.artwork }} />

                            </View>
                        </ScrollView>
                    )}


                    {/* <Text>{item.description}</Text> */}
                </View>
            )
        }

        private handleLayoutChange = () => {
            this.setState({ height: Dimensions.get('window').height })
        }

        private handleShare = () => {
            Share.open(this.getShareOptions())
        }

        private handleFullScreenToggle = () => {
            const { fullScreen } = this.state
            this.setState({ fullScreen: !fullScreen })
        }

        private getShareOptions = () => {

            return {
                title: 'livestream',
                message: `Kijk naar deze video van Salto`,
                url: 'url',
                subject: `Kijk naar deze video van Salto` //  for email
            }
        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
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
        overflow: 'hidden',
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
