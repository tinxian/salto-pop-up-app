import * as React from 'react'
import { View, StyleSheet, StyleProp, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import SocketIOClient from 'socket.io-client'
import { LiveStreamDataType, Media } from 'src/services/media'
import { SubTitle } from 'src/components/core/Typography/SubTitle'
import { BottomDrawerManager } from 'src/components/core/BottomDrawerManager/BottomDrawerManager'
import { RadioScreen } from 'src/screens/Radio/RadioScreen'
import { ThemeType } from 'src/services/theme';
import { Dispatcher } from 'src/utils/Dispatcher';
import { TrackPlayerControls } from '../TrackPlayer/TrackPlayer';

interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
    onPressBar?: () => void
}

interface State {
    loading: boolean
    active: boolean
    programData?: LiveStreamDataType
    openRadioScreen: boolean
}

export class RadioBar extends React.Component<Props, State> {

    public static radioBarDispatcher = new Dispatcher()

    public state: State = {
        loading: false,
        active: false,
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
                        active={this.state.active}
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
        this.setState({ active })
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

        return `${theme.content.general.RadioName}: ${programData.title} ${programData.music && `- ${programData.music.title}`}`
    }

    private async initializeLiveData() {
        this.socket = SocketIOClient('https://api.salto.nl/nowplaying')
        this.socket.emit('join', { channel: Media.getRadioChannelName() })

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
        this.setState({ active: true })
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
    },
})
