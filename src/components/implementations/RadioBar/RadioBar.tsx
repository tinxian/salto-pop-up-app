import * as React from 'react'
import { View, StyleSheet, StyleProp, Button, Text } from 'react-native'
import SoundPlayer from 'react-native-sound-player'

interface Props {
    style?: StyleProp<{}>
}

interface State {
    loading: boolean
}

export class RadioBar extends React.Component<Props, State> {

    public componentDidMount() {

        SoundPlayer.onFinishedPlaying((success: boolean) => { // success is true when the sound is played
            console.log('finished playing', success)
        })

        SoundPlayer.onFinishedLoading(async (success: boolean) => {
            console.log('finished loading', success)
            // ready to `play()`, `getInfo()`, etc
            console.log(await SoundPlayer.getInfo())
        })
    }

    public render() {
        return (
            <View style={this.getStyles()}>
                <Text>Radfio title</Text>
                <View style={styles.controls}>
                    <Button title="Play" onPress={this.playRadio} />
                    <Button title="Pause" onPress={() => SoundPlayer.pause()} />
                </View>
            </View>
        )
    }

    private playRadio = () => {
        try {
            this.setState({ loading: true })
            SoundPlayer.playUrl('https://icecast.streamone.net/46ANH44CYA8S')
        } catch (e) {
            throw (e)
        }
    }

    private getStyles() {
        const { style } = this.props
        return [
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

    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
