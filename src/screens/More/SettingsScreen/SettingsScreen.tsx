import * as React from 'react'
import { View, StyleSheet, StyleProp, TouchableOpacity, Button, Switch } from 'react-native'
import { getIcon } from 'src/utils/icons'
import { NavigationScreenProps } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import themeAde from '../../../../themeAde.json'
import theme from '../../../../theme.json'

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
            return (
                <View style={this.getStyles()}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name={getIcon('close')} size={50} />
                        <Switch value={this.state.themeSwitch} onValueChange={this.onThemeChange} />
                    </TouchableOpacity>
                </View>
            )
        }

        private onThemeChange = (bool: boolean) => {
            const { setThemeState } = this.props.themeContext
            if (bool) {
                setThemeState(themeAde)
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
    },
})
