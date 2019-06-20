import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { ThemeType } from 'src/services/theme';


interface Props extends TouchableOpacityProps {
    buttonstyle?: StyleProp<{}>
    theme: ThemeType
}

export class Button extends React.Component<Props, {}> {

    public render() {
        const { theme } = this.props

        return (
            <TouchableOpacity  {...this.props} >
                <View style={this.getStyles()}>
                    <Paragraph color={theme.colors.ButtonTextColor}>Luister naar {theme.content.general.RadioName}</Paragraph>
                </View>
            </TouchableOpacity >
        )
    }

    private getStyles() {
        const { style, theme } = this.props
        return [
            { backgroundColor: theme.colors.ButtonColor },
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
})
