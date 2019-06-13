import * as React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Title } from 'src/components/core/Typography/Title';
import { ThemeType } from 'src/services/theme';
import { NavigationScreenProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon } from 'src/utils/icons';
import { WidgetType } from 'src/screens/Home/widgets';

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
    theme: ThemeType
    widget: WidgetType
}

interface State {

}

export class WidgetView extends React.Component<Props, State> {

    public render() {
        const { widget, theme, children, navigation } = this.props

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement((child as JSX.Element), { theme, navigation })
        );

        return (
            <View style={this.getStyles()}>
                <View style={styles.headerContainer}>
                    <Icon
                        name={getIcon(widget.icon)}
                        color={this.props.theme.colors.TextColor}
                        size={25}
                    />
                    <Title
                        color={theme.colors.TitleColor}
                        textStyle={styles.title}
                    >
                        {widget.title}
                    </Title>

                </View>
                {childrenWithProps}
            </View>
        )
    }

    private getStyles() {
        const { style, theme } = this.props
        return [
            styles.container,
            { backgroundColor: theme.colors.ButtonColor },
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 16,
        width: '100%',
        shadowColor: "#000",
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
    }
})
