import * as React from 'react'
import { View, StyleSheet, StyleProp, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import SocketIOClient from 'socket.io-client'
import { LiveStreamDataType } from 'src/services/media'
import { SubTitle } from 'src/components/core/Typography/SubTitle'
import { BottomDrawerManager } from 'src/components/core/BottomDrawerManager/BottomDrawerManager'
import { RadioScreen } from 'src/screens/Radio/RadioScreen'
import { ThemeType } from 'src/services/theme'
import { Dispatcher } from 'src/utils/Dispatcher'
import { TrackPlayerControls } from '../TrackPlayer/TrackPlayer'

interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
    onPressBar?: () => void
}

interface State {
    loading: boolean
    programData?: LiveStreamDataType
    openRadioScreen: boolean
}

export class RadioBar extends React.Component<Props, State> {

    public static radioBarDispatcher = new Dispatcher()

    public state: State = {
        loading: false,
        programData: undefined,
        openRadioScreen: false,
    }

    private TrackPlayerControlsRef: TrackPlayerControls | null
    private BottomDrawerManager: BottomDrawerManager | null
    private socket: SocketIOClient.Socket | null = null

    public async componentDidMount() {
        await this.initializeDispatchers()
    }

    public async componentWillUnmount() {
        RadioBar.radioBarDispatcher.unsubscribe('openRadioScreen', () => this.handleRequestOpenRadioScreen())
        this.destroySocket()
    }

    public render() {
        const { programData, openRadioScreen } = this.state

        return (
            <BottomDrawerManager
                requestOpenBottomDrawer={openRadioScreen}
                ref={ref => this.BottomDrawerManager = ref}
                renderHandler={() => this.renderHandler(programData)}
                renderContent={() => (
                    <RadioScreen
                        programData={programData}
                    />
                )}
            />
        )
    }

    private renderHandler(programData?: LiveStreamDataType) {
        const { theme } = this.props

        return (
            <TouchableOpacity onPress={() => this.handleRequestOpenRadioScreen()}>
                <View style={this.getStyles()}>
                    <TrackPlayerControls
                        theme={theme}
                        onToggleRadio={this.handleToggleRadio}
                        programData={programData}
                        ref={ref => this.TrackPlayerControlsRef = ref}
                    />
                    <View style={{ flex: 1, paddingRight: 12 }}>
                        <SubTitle
                            numberOfLines={1}
                            color={theme.colors.TextColor}
                        >
                            {this.getRadioMeta()}
                        </SubTitle>
                    </View>
                    <Icon
                        name={getIcon('arrow-up')}
                        color={this.props.theme.colors.TextColor}
                        size={22}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    private handleToggleRadio = (active: boolean) => {
        if (active) {
            this.initializeLiveData()
            return
        }

        this.destroySocket()
    }

    private getRadioMeta() {
        const { theme } = this.props
        const { programData } = this.state

        if (!programData) {
            return theme.content.general.RadioName
        }

        if (!programData.music || !programData.music.title) {
            return programData.title
        }

        return `${programData.music.title} ${programData.music.artist ? ` - ${this.getArtist(programData.music.artist)}` : ''}`
    }

    private async initializeLiveData() {
        this.socket = SocketIOClient('https://api.salto.nl/nowplaying')
        this.socket.emit('join', { channel: this.props.theme.content.channels.RadioChannelName })

        this.socket.on('connection', (programData: LiveStreamDataType) => {
            this.setState({ programData })

            if (this.TrackPlayerControlsRef) {
                this.TrackPlayerControlsRef.setTrackPlayer(programData)
            }

            return programData
        })

        this.socket.on('update', (programData: LiveStreamDataType) => {
            this.setState({ programData })

            if (this.TrackPlayerControlsRef) {
                this.TrackPlayerControlsRef.setTrackPlayer(programData)
            }

            return programData
        })
    }

    private handleRequestOpenRadioScreen() {
        this.initializeLiveData()

        if (this.BottomDrawerManager) {
            this.BottomDrawerManager.requestOpenBottomDrawer()
        }
    }

    private initializeDispatchers() {
        RadioBar.radioBarDispatcher.subscribe('openRadioScreen', () => this.handleRequestOpenRadioScreen())
    }

    private destroySocket() {
        if (this.socket) {
            this.socket.disconnect()
        }

        this.socket = null
    }

    private getArtist(artist: string[]) {
        return artist.join(', ')
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
        display: 'none',
        width: '100%',
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 22,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})
