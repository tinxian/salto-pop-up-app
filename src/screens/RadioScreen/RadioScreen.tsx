import * as React from 'react'
import { View, StyleSheet, StyleProp, Button } from 'react-native'
// import SoundPlayer from 'react-native-sound-player'

interface Props {
    style: StyleProp<{}>
}

interface State {

}

export class RadioScreen extends React.Component<Props, State> {

    public componentWillMount() {
        // try {
        //     SoundPlayer.playUrl('https://icecast.streamone.net/46ANH44CYA8S')
        // } catch (e) {
        //     throw (e)
        // }
    }
    public render() {
        return (
            <View style={this.getStyles()}>
                {/* <Button title="Play" onPress={() => SoundPlayer.play()} />
                <Button title="Pause" onPress={() => SoundPlayer.pause()} /> */}
            </View>
        )
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
        flex: 1,
    },
})
