
import React from 'react'
import { Text, Dimensions } from 'react-native'

import { StyleSheet, StyleProp, View } from 'react-native'


interface Props {
    style?: StyleProp<{}>
    appNotification: any
}

export class EventAttentionModal extends React.Component<Props, {}> {
    public render() {
        const { appNotification } = this.props
        const message = 'hey'
        const { width } = Dimensions.get('window')
        const itemWidth = width - (18 + 18 + 18 + 18)

        return (
            <View style={this.getStyles()}>
                <View>
                    <View style={styles.content}>
                        <View style={{ minHeight: 40 }}>
                            {message && <Text style={styles.text}>{message}</Text>}
                        </View>
                        <View style={styles.feedbackItemWrapper}>

                        </View>
                    </View>
                </View>
            </View>
        )
    }

    private getStyles() {
        const { style } = this.props

        return [styles.container, style]
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(242,244,245)',
        maxHeight: 328,
    },
    feedbackItemWrapper: {
        borderColor: 'rgba(0,0,0,0.12)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    text: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: Math.round(28 * 1.29),
        color: '#333333',
        marginBottom: 28,
    },
    content: {
        padding: 18,
        paddingTop: 28,
    },
})