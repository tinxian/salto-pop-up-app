import * as React from 'react'
import { View, StyleSheet, StatusBar, ActivityIndicator, ScrollView } from 'react-native'
import Video from 'react-native-video'
import { Media, LiveStreamDataType } from 'src/services/media'
import SocketIOClient from 'socket.io-client'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import { Videos, ScheduleType } from 'src/services/videos'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { InformationList } from 'src/components/core/List/InformationList'

interface Props {
    uri?: string,
}

interface State {
    loading: boolean
    programData?: LiveStreamDataType
    schedule: ScheduleType[]
    active: boolean
}

export const RadioScreen = withThemeContext(
    class RadioScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loading: true,
            programData: undefined,
            active: false,
            schedule: [],
        }

        public player: Video | null
        private socket: any

        public async componentDidMount() {
            Media.stopOtherMedia()
            StatusBar.setHidden(true, 'fade')
            this.socket = SocketIOClient('https://api.salto.nl/nowplaying')
            this.socket.emit('join', { channel: 'stadsfm' })// emits 'hi server' to your server

            // Listens to channel2 and display the data recieved
            this.socket.on('update', (data: LiveStreamDataType) => {
                console.log(data)
                this.setState({ programData: data })
            })

            const schedule = await Videos.getScheduleByChannel('stadsfm')

            this.setState({ schedule })

        }

        public componentWillUnmount() {
            StatusBar.setHidden(false, 'fade')
        }

        public render() {
            const { programData, schedule } = this.state

            if (!programData) {
                return (
                    <View style={this.getStyles()}>
                        <ActivityIndicator />
                    </View>
                )
            }

            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={true} animated={true} />
                    <ScrollView>
                        <InformationList
                            data={schedule}
                            theme={this.props.themeContext.theme}
                        />
                    </ScrollView>
                </View>
            )
        }

        private renderControls() {
            const { loading, active } = this.state
            const { themeContext } = this.props

            if (loading) {
                return <ActivityIndicator />
            }

            return (
                <Icon
                    name={!active ? getIcon('play') : getIcon('square')}
                    color={themeContext.theme.colors.RadioPlayerControlsColor}
                    size={33}
                />
            )
        }

        private getStyles() {
            const { themeContext } = this.props
            return [
                styles.container,
                { backgroundColor: themeContext.theme.colors.BottomDrawerColor },
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
    controls: {
        overflow: 'hidden',
        backgroundColor: '#000000',
        marginRight: 12,
        width: '100%',
        height: 300,
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
