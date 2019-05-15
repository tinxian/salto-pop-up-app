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
    BottomDrawerColor: string
    ButtonColor: string
    LabelColor: string
    LabelTextColor: string
    PageBackgroundColor: string
    SaltoColor: string
    TextColor: string
    SubTitleColor: string
    TitleColor: string
    VideoBackgroundColor: string
    playButtonColor: string
    LiveIndicatorBackgroundColor: string
    LiveIndicatorTextColor: string
    SeperatorColor: string
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
    setThemeState: (values: ThemeType) => void
}

export const ThemeContext: Context<ContextType> = React.createContext({
    theme,
    setThemeState: () => 'Context not set',
})

export class ThemeProvider extends React.Component<Props, ContextType> {

    public state: ContextType = {
        theme,
        setThemeState: newTheme => this.setThemeStateValue(newTheme),
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
        console.log('new', newThemeState)
        this.setState({ theme: newThemeState })
        console.log('updated', this.state.theme)
        return true
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
