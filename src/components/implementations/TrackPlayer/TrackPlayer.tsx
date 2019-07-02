import * as React from 'react'
import { View, StyleSheet, StyleProp, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import { LiveStreamDataType } from 'src/services/media'
import { ThemeType } from 'src/services/theme'
import { Dispatcher } from 'src/utils/Dispatcher'

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
            artist: programData.music.artist ? this.getArtist(programData.music.artist) : '',
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
        const { programData, theme } = this.props

        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
        })

        TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.add({
                id: 'trackId',
                url: this.props.theme.content.urls.RadioUrl,
                title: programData ? programData.title : theme.content.general.RadioName,
                artist: '',
                artwork: this.getNowPlayingLogo(),
            })
        })
    }

    private getArtist(artist: string[]) {
        return artist.join(', ')
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
    },
})
