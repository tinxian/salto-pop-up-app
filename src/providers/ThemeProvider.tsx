import React, { Context } from 'react'
import theme from '../../theme.json'
import { ThemeContextType, ThemeType, Theme } from 'src/services/theme.js'
import axios from 'axios'
import { AsyncStorage } from 'react-native';

export const ThemeContext: Context<ThemeContextType> = React.createContext({
    theme,
    setThemeState: () => 'Context not set',
})

export class ThemeProvider extends React.Component<{}, ThemeContextType> {

    public state: ThemeContextType = {
        theme,
        setThemeState: newTheme => this.setThemeStateValue(newTheme),
    }

    public async componentDidMount() {
        try {
            await this.setCachedThemeToState()
            await this.setExternalThemeToState()
            await this.setThemeToCache()
        } catch (error) {
            console.error(error)
        }
    }

    public render() {
        const { children } = this.props

        return (
            <ThemeContext.Provider
                value={this.state}
            >
                {children}
            </ThemeContext.Provider>
        )
    }

    private setThemeStateValue(newThemeState: ThemeType) {
        this.setState({ theme: newThemeState })
        return true
    }

    private async setCachedThemeToState() {
        const cachedThemeString = await AsyncStorage.getItem('theme')

        if (cachedThemeString) {
            const cachedThemeObject = JSON.parse(cachedThemeString)
            this.setState({ theme: cachedThemeObject })
        }
    }

    private async setExternalThemeToState() {
        const response = await axios.get(Theme.getExternalTheme())

        if (response) {
            this.setState({ theme: response.data })
        }
    }

    private async setThemeToCache() {
        const { theme } = this.state

        await AsyncStorage.setItem('theme', JSON.stringify(theme))
    }
}

const hoistStatics = require('hoist-non-react-statics')

export interface ThemeInjectedProps {
    themeContext: ThemeContextType
}

export function withThemeContext<Props>(Component: React.ComponentClass<ThemeInjectedProps & Props>) {
    class ComponentWithTheme extends React.Component<ThemeInjectedProps & Props, {}> {

        public render() {
            return (

                <ThemeContext.Consumer>
                    {context => <Component {...this.props} themeContext={context} />}
                </ThemeContext.Consumer>
            )
        }
    }

    return hoistStatics(ComponentWithTheme, Component) as React.ComponentClass<Props>
}
