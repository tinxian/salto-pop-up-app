import * as React from 'react'
import { View, StyleSheet, StyleProp, Button, StatusBar, Dimensions, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import VideoPlayer from 'react-native-video-controls'
import Video from 'react-native-video'
import { ExpandableContainer } from 'src/components/core/Animation/ExpandableContainer'
import Share from 'react-native-share';
import { Media } from 'src/services/media';
import { LiveIndicator } from 'src/components/core/LiveIndicator/LiveIndicator';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loading: boolean
    fullScreen: boolean
    height: number
}

export class LivestreamVideoScreen extends React.Component<Props, State> {
    public state: State = {
        loading: true,
        fullScreen: false,
        height: Dimensions.get('window').height,
    }

    public player: Video | null

    public componentDidMount() {
        Media.stopOtherMedia()
        StatusBar.setHidden(true, 'fade')
    }

    public componentWillUnmount() {
        StatusBar.setHidden(false, 'fade')
    }

    public render() {
        const { fullScreen, height } = this.state


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

                </ExpandableContainer>

                <LiveIndicator style={styles.liveIndicator} />

                {/* <Title numberOfLines={2} >{item.title}</Title> */}
                <View style={styles.actions}>
                    <Button title="Share" onPress={this.handleShare} />
                </View>
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
    actions: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
})
