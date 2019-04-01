import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
    Text,
    TouchableHighlight,
} from 'react-native'
import { colors } from 'src/utils/colors'

interface Props {
    style?: StyleProp<{}>
    label: string
    onPress?: () => void
}

interface State {}

// tslint:disable:jsx-use-translation-function
export class ListItem extends React.Component<Props, State> {

    public render() {
        const { label } = this.props
        return (
            <TouchableHighlight
                onPress={this.handleOnpress}
                underlayColor={colors.buttons.pressed}
            >
                <View style={this.getStyles()}>
                    <Text style={styles.text}>
                        {label}
                    </Text>
                    <Text style={styles.arrow}>
                        >
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    private handleOnpress = () => {
        const { onPress } = this.props

        if (onPress) {
            onPress()
        }
    }

    private getStyles(): StyleProp<{}> {
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
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,

    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0.1,
        color: colors.typography.text,
    },
    arrow: {
        fontSize: 16,
        color: colors.typography.lightGray,
    },
})
