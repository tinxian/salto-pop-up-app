import * as React from 'react'
import { StyleSheet, StyleProp, Image, View, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { ThemeType } from 'src/services/theme';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
    theme: ThemeType
}

interface State {

}

export class Logo extends React.Component<Props, State> {
    public render() {
        const { navigation, theme } = this.props

        return (
            <TouchableOpacity style={this.getStyles()} onPress={() => navigation.navigate('HomeScreen')}>
                <Image style={styles.image} source={theme.images.logoUrl} />
            </TouchableOpacity>

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

    },
    image: {
        height: 42,
        width: 42,
    }
})
