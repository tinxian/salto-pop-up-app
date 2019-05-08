import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeType } from 'src/providers/ThemeProvider'
import { getIcon } from 'src/utils/icons'
import SocketIOClient from 'socket.io-client'
import { LiveStreamDataType } from 'src/services/media';


interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
}

interface State {
    loading: boolean
    active: boolean
    programData?: LiveStreamDataType
}

export class RadioBar extends React.Component<Props, State> {

    public state: State = {
        loading: false,
        active: false,
        programData: undefined,
    }

    private socket: any

    public componentDidMount() {
        SoundPlayer.onFinishedLoading(() => {
            this.setState({
                loading: false,
            })
        })

        this.initLiveData()
    }

    public render() {
        const { programData } = this.state

        if (!programData) {
            return (
                <View style={this.getStyles()}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={this.getStyles()}>
                <TouchableOpacity onPress={this.toggleRadio}>
                    <View style={styles.controls}>
                        <React.Fragment>
                            <Image style={{ height: '100%', width: 50, position: 'absolute' }} source={{ uri: programData.logo }} />
                            <View style={styles.cover} />
                            {this.renderControls()}
                        </React.Fragment>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ color: this.props.theme.RadioPlayerControlsColor }}>Nu live:  {programData.title}</Text>
                </View>
            </View>
        )
    }

    private initLiveData() {
        this.socket = SocketIOClient('https://api.salto.nl/nowplaying');
        this.socket.emit('join', { channel: 'stadsfm' });// emits 'hi server' to your server

        this.socket.on('update', (data: LiveStreamDataType) => {
            this.setState({ programData: data })
        })
    }

    private renderControls() {
        const { loading, active } = this.state

        if (loading) {
            return <ActivityIndicator />
        }

        return (
            <Icon
                name={!active ? getIcon('play') : getIcon('square')}
                color={this.props.theme.RadioPlayerControlsColor}
                size={33}
            />
        )
    }

    private toggleRadio = () => {
        const { active } = this.state
        try {
            this.setState({ loading: false, active: !active })

            if (!active) {
                SoundPlayer.playUrl('https://icecast.streamone.net/46ANH44CYA8S')
                return
            }
            SoundPlayer.pause()

        } catch (e) {
            throw (e)
        }
    }

    private getStyles() {
        const { style } = this.props
        return [
            { backgroundColor: this.props.theme.RadioPlayerBackgroundColor },
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
        paddingRight: 22,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
    controls: {
        backgroundColor: '#000000',
        marginRight: 12,
        width: 50,
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
    }
})
