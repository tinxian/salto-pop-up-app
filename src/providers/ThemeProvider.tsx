import React, { Context } from 'react'
import theme from '../../theme.json'
import { ThemeContextType, ThemeType, Theme } from 'src/services/theme.js'
import axios from 'axios'

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
        const response = await axios.get(Theme.getExternalTheme())
        this.setState({ theme: response.data })
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
                    {
                        context => <Component {...this.props} themeContext={context} />}
                </ThemeContext.Consumer>
            )
        }
    }

    return hoistStatics(ComponentWithTheme, Component) as React.ComponentClass<Props>
}
