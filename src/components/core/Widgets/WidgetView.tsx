import * as React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Title } from 'src/components/core/Typography/Title';
import { ThemeType } from 'src/services/theme';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
    theme: ThemeType
    title: string
}

interface State {

}

export class WidgetView extends React.Component<Props, State> {

    public render() {
        const { title, theme, children, navigation } = this.props

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement((child as JSX.Element), { theme, navigation })
        );

        return (
            <View style={this.getStyles()}>
                <Title
                    color={theme.colors.TitleColor}
                    textStyle={styles.title}
                >
                    {title}
                </Title>
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
    },
    title: {
        marginBottom: 8,
    }
})
