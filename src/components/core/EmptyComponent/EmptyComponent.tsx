import * as React from 'react'
import { StyleProp, StyleSheet, View, TouchableOpacity } from 'react-native'
import { SubTitle } from '../Typography/SubTitle'
import { Paragraph } from '../Typography/Paragraph'
import { ThemeType } from 'src/services/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'

interface Props {
    style?: StyleProp<{}>,
    theme: ThemeType
    onPress: () => void
}

export class EmptyComponent extends React.Component<Props, {}> {
    public render() {
        const { theme, onPress } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={this.getStyles()}>
                    <Icon
                        name={getIcon('close')}
                        color={theme.colors.SubTitleColor}
                        size={40}
                    />
                    <Paragraph color={theme.colors.TextColor} >Deze lijst lijkt leeg te zijn</Paragraph>
                    <SubTitle color={theme.colors.SubTitleColor} >Klik nog een keer om opnieuw te proberen </SubTitle>
                </View>
            </TouchableOpacity>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        lineHeight: 14,
        fontSize: 14,
        fontWeight: '600',
    },
})
