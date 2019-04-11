import * as React from 'react'
import { Component } from 'react'
import { View, Text, StyleSheet, StyleProp, Button } from 'react-native'
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation'
import Video from 'react-native-video'

interface Params {
    uri: string,
}

interface OnDemandVideoScreenProps extends NavigationScreenProps<Params> {
    style: StyleProp<{}>,
    uri?: string,
}

interface OnDemandVideoScreenState {

}

export class OnDemandVideoScreen extends React.Component<OnDemandVideoScreenProps, OnDemandVideoScreenState> {
    public state: {

    }

    public render() {
        return (
            <View style={this.getStyles()}>
                    <View style={styles.newDiv}>
                        <Video
                            style={{ flex: 1 }}
                            controls={true}
                            source={{ uri: this.props.navigation.getParam('uri') }}
                        />
                    </View>
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
        backgroundColor: 'black',
    },
    newDiv: {
        height: '100%',
        width: '100%',
    },
})
