import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LocalizationProvider, initializeLocalization } from './services/LocalizationService'

import {
    createAppContainer,
    NavigationScreenProp,
    NavigationRouter,
} from 'react-navigation'
import { ThemeInjectedProps } from './providers/ThemeProvider';
import { RootNavigator } from './AppStack'
import SplashScreen from 'react-native-splash-screen';

export class AppProviders extends React.Component<{ navigation: NavigationScreenProp<{}> } & ThemeInjectedProps> {
    public static router: NavigationRouter<{}, {}> = RootNavigator.router

    public componentDidMount() {
        SplashScreen.hide()
    }

    public render() {
        return (
            <View style={styles.container}>
                <LocalizationProvider initialize={initializeLocalization}>
                    <RootNavigator
                        navigation={this.props.navigation}
                    />
                </LocalizationProvider>
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
