import * as React from 'react'
import { View, StyleSheet, StyleProp, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Video from 'react-native-video'
import { Media, LiveStreamDataType } from 'src/services/media';
import { LiveIndicator } from 'src/components/core/LiveIndicator/LiveIndicator';
import SocketIOClient from 'socket.io-client'
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon } from 'src/utils/icons';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loading: boolean
    programData?: LiveStreamDataType
    active: boolean
}

export const RadioScreen = withThemeContext(
    class RadioScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loading: true,
            programData: undefined,
            active: false,
        }


        public player: Video | null
        private socket: any

        public componentDidMount() {
            Media.stopOtherMedia()
            StatusBar.setHidden(true, 'fade')
            this.socket = SocketIOClient('https://api.salto.nl/nowplaying');
            this.socket.emit('join', { channel: 'stadsfm' });// emits 'hi server' to your server

            // Listens to channel2 and display the data recieved
            this.socket.on('update', (data: LiveStreamDataType) => {
                console.log(data)
                this.setState({ programData: data })
            });
        }

        public componentWillUnmount() {
            StatusBar.setHidden(false, 'fade')
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
                    <StatusBar hidden={true} animated={true} />

                    <TouchableOpacity onPress={this.toggleRadio}>
                        <View style={styles.controls}>
                            <Image resizeMode={'cover'} style={{ height: '100%', width: '100%', position: 'absolute' }} source={{ uri: programData.logo }} />
                            <View style={styles.cover} />
                            {this.renderControls()}
                        </View>
                    </TouchableOpacity>
                    <LiveIndicator />

                    {/* <Text>{item.description}</Text> */}
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

        private toggleRadio = () => {

        }

        private getStyles() {
            const { style, themeContext } = this.props
            return [
                styles.container,
                { color: themeContext.theme.colors.PageBackgroundColor },
                style,
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
