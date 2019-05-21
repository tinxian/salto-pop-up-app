import * as React from 'react'
import { View, StyleSheet, StyleProp, SafeAreaView } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { HeaderNavigation } from 'src/components/core/Navigation/HeaderNavigation.js'
import { EmptyComponent } from 'src/components/core/EmptyComponent/EmptyComponent.js'

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {
    themeSwitch: boolean
}

export const SettingsScreen = withThemeContext(
    class SettingsScreen extends React.Component<Props & ThemeInjectedProps, State> {

        public state: State = {
            themeSwitch: false,
        }

        public render() {
            const { themeContext, navigation } = this.props
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <HeaderNavigation navigation={navigation} title={'Instellingen'} />
                    <View style={this.getStyles()}>
                        {/* <View style={styles.settingsPageItem}>
                            <Title color={themeContext.theme.colors.TitleColor}>Alternate theme</Title>
                            <Button title={'Toggle theme'} onPress={this.onThemeChange} />
                        </View> */}
                        <EmptyComponent theme={themeContext.theme} onPress={() => undefined} />
                    </View>
                </SafeAreaView>
            )
        }

        // private onThemeChange = () => {
        //     const { setThemeState, theme } = this.props.themeContext
        //     const { themeSwitch } = this.state
        //     if (themeSwitch) {
        //         setThemeState(themeAlt)
        //         this.setState({ themeSwitch: false })
        //         return
        //     }
        //     this.setState({ themeSwitch: true })
        //     setThemeState(theme)
        // }

        private getStyles() {
            const { style, themeContext } = this.props
            return [
                styles.container,
                { backgroundColor: themeContext.theme.colors.PageBackgroundColor },
                style,
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    settingsPageItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
})
