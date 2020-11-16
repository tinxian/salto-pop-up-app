import React from 'react'
import { View, StyleSheet } from 'react-native'

import {
    createAppContainer,
    NavigationScreenProp,
    NavigationRouter,
} from 'react-navigation'
import { ThemeInjectedProps, ThemeProvider } from './providers/ThemeProvider'
import { RootNavigator } from './AppStack'
import SplashScreen from 'react-native-splash-screen'
import { VideosProvider } from './providers/VideosProvider'
import { AppNotificationManager } from './components/core/AppNotification/AppNotificationManager'

export class AppProviders extends React.Component<{ navigation: NavigationScreenProp<{}> } & ThemeInjectedProps> {
    public static router: NavigationRouter<{}, {}> = RootNavigator.router


    public componentDidMount() {
        SplashScreen.hide()
    }

    public render() {
        return (
            <View style={styles.container}>
                <AppNotificationManager />
                <ThemeProvider>
                    {theme => (
                        <VideosProvider theme={theme}>
                            <RootNavigator
                                navigation={this.props.navigation}
                            />
                        </VideosProvider>
                    )}
                </ThemeProvider>
            </View>
        )
    }
}

export const App = createAppContainer(AppProviders)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
