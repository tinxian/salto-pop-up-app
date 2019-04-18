import * as React from 'react'
import { View, StyleSheet, StyleProp, Button } from 'react-native'
import Video from 'react-native-video'

interface Props {
    style: StyleProp<{}>
}

interface State {

}

export class LiveStreamScreen extends React.Component<Props, State> {
    public render() {
        return (
            <View style={this.getStyles()}>
                <Video
                    style={{ flex: 1 }}
                    controls={true}
                    source={{ uri: 'https://media.streamone.net/hlslive/account=AgYIPooZRV0y/livestream=8wJNPcoQbUwW/8wJNPcoQbUwW.m3u8' }}
                />
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
