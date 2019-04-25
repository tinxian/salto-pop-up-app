import React from 'react'
import { StyleProp, Text, StyleSheet, TextProps } from 'react-native';

interface Props extends TextProps {
    style?: StyleProp<{}>
    focused?: boolean
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
        const { style } = this.props
        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        fontWeight: '700',
    }
})
