import * as React from 'react'
import { View, StyleSheet, StyleProp, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeType } from 'src/providers/ThemeProvider'
import { getIcon } from 'src/utils/icons'
import SocketIOClient from 'socket.io-client'
import { LiveStreamDataType } from 'src/services/media';
import { SubTitle } from 'src/components/core/Typography/SubTitle';


interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
    onPressBar?: () => void
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
                    <View style={styles.controls}>
                        <ActivityIndicator />
                    </View>
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={this.onPressBar}>
                <View style={this.getStyles()}>
                    <TouchableOpacity onPress={this.toggleRadio}>
                        <View style={styles.controls}>
                            <Image resizeMode={'cover'} style={{ height: 56, width: 100, position: 'absolute' }} source={{ uri: programData.logo }} />
                            <View style={styles.cover} />
                            {this.renderControls()}
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, paddingRight: 12 }}>
                        <SubTitle numberOfLines={1} color={this.props.theme.colors.RadioPlayerControlsColor}>Nu live:  {programData.title}</SubTitle>
                    </View>
                    <Icon
                        name={getIcon('arrow-up')}
                        color={this.props.theme.colors.RadioPlayerControlsColor}
                        size={22}
                    />
                </View>
            </TouchableOpacity>
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
                color={this.props.theme.colors.RadioPlayerControlsColor}
                size={33}
            />
        )
    }

    private onPressBar = () => {
        const { onPressBar } = this.props

        if (onPressBar) {
            onPressBar()
        }
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
            { backgroundColor: this.props.theme.colors.RadioPlayerBackgroundColor },
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 22,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
    controls: {
        overflow: 'hidden',
        backgroundColor: '#000000',
        marginRight: 12,
        width: 56,
        height: 40,
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
})
