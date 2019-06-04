import * as React from 'react'
import { StyleSheet, StyleProp, Image, View, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { images } from 'src/utils/images'

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export class Logo extends React.Component<Props, State> {
    public render() {
        const { navigation } = this.props

        return (
            <View style={this.getStyles()} >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('HomeScreen')}>
                    <View>
                        <Image source={images.logo} />
                    </View>
                </TouchableOpacity>
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
        zIndex: 5,

    },
})
