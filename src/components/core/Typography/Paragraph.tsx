import React from 'react'
import { StyleProp, Text, StyleSheet, TextProps } from 'react-native';

interface Props extends TextProps {
    textStyle?: StyleProp<{}>
    color: string
}

export class Paragraph extends React.Component<Props, {}> {
    public render() {
        return (
            <Text style={this.getStyles()} {...this.props}>
                {this.props.children}
            </Text>
        )
    }

    private getStyles() {
        const { textStyle, color } = this.props
        return [
            styles.container,
            { color },
            textStyle,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        fontWeight: '500',
    }
})
