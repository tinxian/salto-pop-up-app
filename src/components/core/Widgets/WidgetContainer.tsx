import * as React from 'react'
import { StyleProp } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { WidgetType } from 'src/screens/Home/widgets'
import { ThemeContextType } from 'src/services/theme'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
    themeContext: ThemeContextType
    widget: WidgetType
}

interface State {

}

export class WidgetContainer extends React.Component<Props, State> {

    public render() {
        const { themeContext, children, navigation, widget } = this.props

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement((child as JSX.Element), { themeContext, navigation, widget })
        )

        if (childrenWithProps === null) {
            return null
        }

        return childrenWithProps

    }
}
