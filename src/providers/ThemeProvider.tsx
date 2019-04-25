import React, { Context } from 'react'
import theme from '../../theme.json'

interface Props { }

export interface ThemeType {
    NavigationBackgroundColor: string
    NavigationIconsColor: string
    NavigationIconsActiveColor: string
    RadioPlayerControlsColor: string,
    RadioPlayerBackgroundColor: string
}

interface ContextType {
    theme: ThemeType
    setThemeState?: (values: { [key in keyof ThemeType]: string }) => void
}

export const ThemeContext: Context<ContextType> = React.createContext({ theme })

export class ThemeProvider extends React.Component<Props, ThemeType> {

    public state: ThemeType = theme

    public render() {
        const { children } = this.props

        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state,
                    setThemeState: this.setThemeStateValue,
                }}
            >
                {children}
            </ThemeContext.Provider>
        )
    }

    private setThemeStateValue = (values: { [key in keyof ThemeType]: string }) => {
        this.setState({
            ...this.state,
            ...values,
        })
    }
}

const hoistStatics = require('hoist-non-react-statics')

export interface ThemeInjectedProps {
    themeContext: ContextType
}

export function withThemeContext<Props>(Component: React.ComponentClass<ThemeInjectedProps & Props>) {
    class ComponentWithTheme extends React.Component<ThemeInjectedProps & Props, {}> {

        public render() {
            return (

                <ThemeContext.Consumer>
                    {
                        context => <Component {...this.props} themeContext={context} />
                    }
                </ThemeContext.Consumer>
            )
        }
    }

    return hoistStatics(ComponentWithTheme, Component) as React.ComponentClass<Props>
}
