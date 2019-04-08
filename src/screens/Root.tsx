import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Intro } from 'src/BP/Intro/Intro'
import { NavigationScreenProps } from 'react-navigation'
import { ThemeProvider } from 'src/providers/ThemeProvider';

interface Props extends NavigationScreenProps { }

export class Root extends Component<Props> {

    public componentDidMount() {
        SplashScreen.hide()
    }

    public render() {
        const { navigation } = this.props
        return (
            <ThemeProvider>
                <View style={styles.container}>
                    <Intro onKitchensink={() => navigation.navigate('KitchenSink')} />
                </View>
            </ThemeProvider>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
