import * as React from 'react'
import { View, StyleSheet, StyleProp, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import SocketIOClient from 'socket.io-client'
import { LiveStreamDataType, Media } from 'src/services/media'
import { SubTitle } from 'src/components/core/Typography/SubTitle'
import { BottomDrawerManager } from 'src/components/core/BottomDrawerManager/BottomDrawerManager'
import { RadioScreen } from 'src/screens/Radio/RadioScreen'
import { ThemeType } from 'src/services/theme';
import { Dispatcher } from 'src/utils/Dispatcher';

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
    public static radioDispatcher = new Dispatcher()

    public state: State = {
        loading: false,
        active: false,
        programData: undefined,
    }


    private socket: any

    public componentDidMount() {
        RadioBar.radioDispatcher.subscribe('stopRadio', () => {
            this.setState({ active: false })
        })

        SoundPlayer.onFinishedLoading(() => {
            this.setState({
                loading: false,
            })
        })

        this.initLiveData()
    }

    public componentWillUnmount() {
        RadioBar.radioDispatcher.destroy()
    }

    public render() {
        const { programData } = this.state
        const { theme } = this.props

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
            <BottomDrawerManager
                renderHandler={open => (
                    <TouchableOpacity onPress={open}>
                        <View style={this.getStyles()}>
                            <TouchableOpacity onPress={this.toggleRadio}>
                                <View style={styles.controls}>
                                    <Image
                                        resizeMode={'cover'}
                                        style={styles.image}
                                        source={{ uri: programData.logo }}
                                    />
                                    <View style={styles.cover} />
                                    {this.renderControls()}
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, paddingRight: 12 }}>
                                <SubTitle
                                    numberOfLines={1}
                                    color={theme.colors.TextColor}
                                >
                                    {theme.content.general.RadioName}: {programData.title} {programData.music && `-${programData.music.title}`}
                                </SubTitle>
                            </View>
                            <Icon
                                name={getIcon('arrow-up')}
                                color={this.props.theme.colors.TextColor}
                                size={22}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                renderContent={() => (
                    <RadioScreen programData={programData} toggleRadio={this.toggleRadio} active={this.state.active} />
                )}
            />

        )
    }

    private initLiveData() {
        this.socket = SocketIOClient('https://api.salto.nl/nowplaying')
        this.socket.emit('join', { channel: Media.getRadioChannelName() })

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
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    controls: {
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
