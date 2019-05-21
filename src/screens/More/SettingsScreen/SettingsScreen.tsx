import * as React from 'react'
import { View, StyleSheet, StyleProp, Switch } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import themeAlt from '../../../../themeAlt.json'
import theme from '../../../../theme.json'
import { HeaderNavigation } from 'src/components/core/Navigation/HeaderNavigation.js';
import { Title } from 'src/components/core/Typography/Title.js';

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
                <>
                    <HeaderNavigation navigation={navigation} title={'Instellingen'} />
                    <View style={this.getStyles()}>
                        <View style={styles.settingsPageItem}>
                            <Title color={themeContext.theme.colors.TitleColor}>Alternate theme</Title>
                            <Switch value={this.state.themeSwitch} onValueChange={this.onThemeChange} />
                        </View>
                    </View>
                </>
            )
        }

        private onThemeChange = (bool: boolean) => {
            const { setThemeState } = this.props.themeContext
            if (bool) {
                setThemeState(themeAlt)
                this.setState({ themeSwitch: bool })
                return
            }
            this.setState({ themeSwitch: bool })
            setThemeState(theme)
        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
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
