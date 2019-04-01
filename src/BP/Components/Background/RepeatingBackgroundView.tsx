import React from 'react'
import {
    StyleProp, ImageSourcePropType, Image, View, StyleSheet
} from 'react-native'
interface Props {
    style?: StyleProp<{}>
    source: ImageSourcePropType
}

interface State {}

export class RepeatingBackgroundView extends React.Component<Props, State> {

    public render() {
        const { source, children } = this.props
        return (
            <View style={this.getStyles()}>
                <Image
                    style={styles.background}
                    source={source}
                    resizeMode="repeat"
                />
                {children}
            </View>
        )
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
        //
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
