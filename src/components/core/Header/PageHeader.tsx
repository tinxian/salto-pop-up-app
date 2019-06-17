
import * as React from 'react'
import { StyleSheet, StyleProp, View } from 'react-native'
import { Title, TitleSizeType } from '../Typography/Title';
import { ThemeType, HeaderTitleType } from 'src/services/theme';

interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
    titles: HeaderTitleType[]
}

interface State {

}

export class PageHeader extends React.Component<Props, State> {
    public render() {
        const { titles } = this.props

        return (
            <View style={this.getStyles()}>
                {this.renderTitles(titles)}
            </View>
        )
    }

    private renderTitles(titles: HeaderTitleType[]) {
        const { theme } = this.props

        return titles.map((titleObj, index: number) => (
            <Title
                key={index}
                size={titleObj.fontSize ? (titleObj.fontSize as TitleSizeType) : TitleSizeType.large}
                color={titleObj.color ? titleObj.color : theme.colors.TextColor}
            >
                {titleObj.title}
            </Title>
        ))
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
        flexDirection: 'column',
        paddingTop: 18,
        marginBottom: 12,
    },
})
