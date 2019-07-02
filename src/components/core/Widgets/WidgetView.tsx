import * as React from 'react'
import { StyleProp, StyleSheet, View } from 'react-native'
import { Title } from 'src/components/core/Typography/Title'
import { ThemeContextType } from 'src/services/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import { WidgetType } from 'src/screens/Home/widgets'

interface Props {
    style?: StyleProp<{}>
    themeContext: ThemeContextType
    widget: WidgetType
}

interface State {

}

export class WidgetView extends React.Component<Props, State> {

    public render() {
        const { widget, themeContext, children } = this.props

        return (
            <View style={this.getStyles()}>
                {widget.title && (
                    <View style={styles.headerContainer}>
                        <Icon
                            name={getIcon(widget.icon)}
                            color={themeContext.theme.colors.TextColor}
                            size={25}
                        />
                        <Title
                            color={themeContext.theme.colors.TitleColor}
                            textStyle={styles.title}
                        >
                            {widget.title}
                        </Title>
                    </View>
                )}
                {children}
            </View>
        )
    }

    private getStyles() {
        const { style, themeContext } = this.props
        return [
            styles.container,
            { backgroundColor: themeContext.theme.colors.WidgetBackgroundColor },
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    headerContainer: {
        flexDirection: 'row',
        height: 37,
        alignItems: 'center',
    },
    title: {
        marginLeft: 12,
        marginBottom: 2,
    },
})
