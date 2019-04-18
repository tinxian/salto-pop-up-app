import * as React from 'react'
import { View, StyleSheet, StyleProp, Button, Text, StatusBar, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import VideoPlayer from 'react-native-video-controls'
import { EpisodeType } from 'src/services/videos'
import { Title } from 'src/components/Typography/Title'
import Video from 'react-native-video'
import { ExpandableContainer } from 'src/components/Animation/ExpandableContainer';

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
}

export class OnDemandVideoScreen extends React.Component<Props, State> {
    public state: State = {
        loading: true,
        fullScreen: false,
    }

    private player: Video | null

    public componentDidMount() {
        StatusBar.setHidden(true, 'fade')
        if (this.player) {
            // this.player.presentFullscreenPlayer()
        }
    }

    public componentWillUnmount() {
        StatusBar.setHidden(false, 'fade')
    }

    public render() {
        const { fullScreen } = this.state
        const item = this.props.navigation.getParam('item')


        return (
            <View style={this.getStyles()}>
                <StatusBar hidden={true} animated={true} />
                <ExpandableContainer
                    expand={fullScreen}
                    startHeight={300}
                    maxHeight={Dimensions.get('window').height}
                    style={styles.videoContainer}
                >
                    <VideoPlayer
                        style={{ flex: 1 }}
                        ref={(ref: Video) => this.player = ref}
                        source={{ uri: item.streams.mp4 }}
                        onBack={() => this.props.navigation.goBack()}
                        onEnterFullscreen={this.handleFullScreenToggle}
                        onExitFullscreen={this.handleFullScreenToggle}
                    />
                </ExpandableContainer>



                <Title numberOfLines={2} >{item.title}</Title>
                <View style={styles.actions}>
                    {/* <Button title="share" onPress={() => Share.open(this.getShareOptions())} /> */}
                    {/* <Button title="Share" onPress={this.handleShare} /> */}
                </View>
                <Text>{item.description}</Text>
            </View>
        )
    }

    // private handleShare = () => {
    //     Share.open(this.getShareOptions())
    // }

    private handleFullScreenToggle = () => {
        const { fullScreen } = this.state
        this.setState({ fullScreen: !fullScreen })
    }

    // private getShareOptions = () => {
    //     const item = this.props.navigation.getParam('item')

    //     return {
    //         title: item.title,
    //         message: `Kijk naar deze video van ${item.programName}`,
    //         url: item.streams.mp4,
    //         subject: `Kijk naar deze video van ${item.programName}` //  for email
    //     }
    // }

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
