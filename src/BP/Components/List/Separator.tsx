import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
} from 'react-native'
import { colors } from 'src/utils/colors'

interface Props {
    style?: StyleProp<{}>
}

interface State {}

export class Separator extends React.Component<Props, State> {

    public render() {
        return (
            <View style={this.getStyles()} />
        )
    }

    private getStyles(): StyleProp<{}> {
        const { style } = this.props

        return [
            styles.seperator,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.border.lightGray,
        width: '100%',
    },
})
