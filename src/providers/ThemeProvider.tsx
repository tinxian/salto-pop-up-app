import React from 'react'

interface Props { }

interface ThemeType {
    NavigationColor: string
    NavigationIconsColor: string
}

const DEFAULT_VALUE: ThemeType = {
    NavigationColor: '#fff',
    NavigationIconsColor: '#000'
}

const ThemeContext = React.createContext(DEFAULT_VALUE);

export class ThemeProvider extends React.Component<Props> {

    public render() {
        const { children } = this.props

        return (
            <ThemeContext.Provider value={DEFAULT_VALUE}>
                {children}
            </ThemeContext.Provider>
        )
    }
}


