import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, ActivityIndicator, Platform } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeType } from 'src/providers/ThemeProvider';

interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
}

interface State {
    loading: boolean
    active: boolean
}

export class RadioBar extends React.Component<Props, State> {

    public state: State = {
        loading: false,
        active: false,
    }

    public componentDidMount() {

        SoundPlayer.onFinishedLoading(() => {
            this.setState({
                loading: false,
            })
        })

        SoundPlayer.onFinishedPlaying((success: boolean) => { // success is true when the sound is played
            this.setState({
                active: false,
            })
        })
    }

    public render() {

        return (
            <View style={this.getStyles()}>
                <Text style={{ color: this.props.theme.RadioPlayerControlsColor }}>Radfio title</Text>
                <View style={styles.controls}>
                    {this.renderControls()}
                </View>
            </View>
        )
    }

    private renderControls() {
        const { loading, active } = this.state
        const prefix = Platform.OS === 'ios' ? 'ios' : 'md'

        if (loading) {
            return <ActivityIndicator />
        }

        return (
            <React.Fragment>

                {/* <Button title="Play" onPress={this.playRadio} />
                <Button title="Pause" onPress={() => SoundPlayer.pause()} /> */}
                <Icon
                    name={!active ? `${prefix}-play` : `${prefix}-pause`}
                    color={this.props.theme.RadioPlayerControlsColor}
                    size={25}
                    onPress={this.toggleRadioRadio}
                />
            </React.Fragment>
        )
    }

    private toggleRadioRadio = () => {
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
        paddingHorizontal: 16,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
