import React from 'react'
import theme from '../../theme.json'

interface Props { }

interface ThemeType {
    NavigationColor: string
    NavigationIconsColor: string
}

const ThemeContext = React.createContext(theme);

export class ThemeProvider extends React.Component<Props, ThemeType> {

    public state: ThemeType = theme

    public render() {
        const { children } = this.props

        return (
            <ThemeContext.Provider value={{
                ...this.state,
                setThemeState: this.setThemeStateValue
            }}>
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


