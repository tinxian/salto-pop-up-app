import React from 'react'
import { StyleProp, Text, StyleSheet, TextProps } from 'react-native';

interface Props extends TextProps {
    textStyle?: StyleProp<{}>
}

export class Title extends React.Component<Props, {}> {
    public render() {
        return (
            <Text style={this.getStyles()} {...this.props}>
                {this.props.children}
            </Text>
        )
    }

    private getStyles() {
        const { textStyle } = this.props
        return [
            styles.container,
            textStyle,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        fontWeight: '700',
    }
})
