import * as React from 'react'
import { View, StyleSheet, StyleProp, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import { LiveStreamDataType } from 'src/services/media'
import { ThemeType } from 'src/services/theme';
import { Dispatcher } from 'src/utils/Dispatcher';
import Config from "react-native-config";

interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
    onToggleRadio?: (active: boolean) => void
    programData?: LiveStreamDataType
}

interface State {
    loading: boolean
    active: boolean
}

export class TrackPlayerControls extends React.Component<Props, State> {

    public static trackPlayerDispatcher = new Dispatcher()

    public state: State = {
        loading: false,
        active: false,
    }

    public componentDidMount() {
        this.initializeTrackPlayer()
        this.initializeDispatchers()
    }

    public componentWillUnmount() {
        TrackPlayer.destroy()
    }

    public setTrackPlayer = (programData: LiveStreamDataType) => {
        const TrackData = this.getTrackData(programData)

        TrackPlayer.add({
            id: 'trackId',
            url: Config.RADIO_URL,
            title: TrackData.title,
            artist: TrackData.artist,
            artwork: this.getNowPlayingLogo(),
        });
    }

    public getTrackData(programData: LiveStreamDataType) {
        const { theme } = this.props

        if (!programData.music) {
            return {
                title: theme.content.general.RadioName,
                artist: '',
            }
        }

        return {
            title: programData.music.title ? programData.music.title : theme.content.general.RadioName,
            artist: programData.music.artists ? this.getArtist(programData.music.artists) : '',
        }
    }

    public render() {
        return (
            <TouchableOpacity onPress={() => this.handleToggleRadio()}>
                <View style={this.getStyles()}>
                    <Image
                        resizeMode={'cover'}
                        style={styles.image}
                        source={{ uri: this.getNowPlayingLogo() }}
                    />
                    <View style={styles.cover} />
                    {this.renderControlsAction()}
                </View>
            </TouchableOpacity>
        )
    }

    private renderControlsAction() {
        const { active, loading } = this.state

        if (loading) {
            return <ActivityIndicator />
        }

        return (
            <Icon
                name={!active ? getIcon('play') : getIcon('square')}
                color={this.props.theme.colors.RadioPlayerControlsColor}
                size={33}
            />
        )
    }

    private handleToggleRadio = () => {
        const { active } = this.state
        const { onToggleRadio } = this.props

        this.setState({ active: !active })

        if (onToggleRadio) {
            onToggleRadio(!active)
        }
        if (!active) {
            this.startRadio()
        } else {
            this.stopRadio()
        }
    }

    private startRadio = () => {
        this.setState({ active: true })
        TrackPlayer.play()
    }

    private stopRadio = () => {
        this.setState({ active: false })
        TrackPlayer.pause()
    }

    private getNowPlayingLogo() {
        const { programData, theme } = this.props

        if (!programData) {
            return (theme.images.defaultThumbnail as any).uri
        }

        return programData.logo
    }

    private initializeTrackPlayer() {
        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ]
        })

        TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.add({
                id: 'trackId',
                url: Config.RADIO_URL,
                title: 'title',
                artist: 'artist',
                artwork: this.getNowPlayingLogo(),
            });
        })
    }

    private getArtist(artists: string[]) {
        return artists.join(', ')
    }

    private initializeDispatchers() {
        TrackPlayerControls.trackPlayerDispatcher.subscribe('stopRadio', () => this.stopRadio())
        TrackPlayerControls.trackPlayerDispatcher.subscribe('startRadio', () => this.startRadio())
    }

    private getStyles() {
        const { style } = this.props
        return [
            { backgroundColor: this.props.theme.colors.RadioPlayerBackgroundColor },
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#000000',
        marginRight: 12,
        width: 56,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.4,
    },
    image: {
        height: 56,
        width: 100,
        position: 'absolute',
    }
})
