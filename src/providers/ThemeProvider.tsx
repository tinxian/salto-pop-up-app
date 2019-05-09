import React, { Context } from 'react'
import theme from '../../theme.json'
import { ImageSourcePropType } from 'react-native';

interface Props { }

export interface ColorsType {
    NavigationBackgroundColor: string
    NavigationIconsColor: string
    NavigationIconsActiveColor: string
    RadioPlayerControlsColor: string,
    RadioPlayerBackgroundColor: string
    ButtonColor: string
    LabelColor: string
    LabelTextColor: string
    PageBackgroundColor: string
    VideoBackgroundColor: string
    SaltoColor: string
    TextColor: string
    SubTitleColor: string
    TitleColor: string
    VideoBackgroundColor: string
}

export interface ImagesType {
    HeaderBackgroundUrl: ImageSourcePropType
}

export interface ThemeType {
    colors: ColorsType
    images: ImagesType
}

export interface ConfigType {

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

    private setThemeStateValue = (values: { [key in keyof ThemeType]: any }) => {
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
