
import * as React from 'react'
import { StyleSheet, StyleProp, View } from 'react-native'
import { Title, TitleSizeType } from '../Typography/Title';
import { ThemeType } from 'src/services/theme';

interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
    title: string
}

interface State {

}

export class PageHeader extends React.Component<Props, State> {
    public render() {
        const { theme, title } = this.props

        return (
            <View style={this.getStyles()}>
                <Title
                    size={TitleSizeType.large}
                    color={theme.colors.TitleColor}
                >
                    {title}
                </Title>
            </View>
        )
    }

    private getStyles() {
        const { style } = this.props
        return [
            styles.container,
            style,
        ]
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 18,
        marginBottom: 12,
    },
})
