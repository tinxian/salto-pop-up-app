
import React from 'react'

import {
    View,
    StyleSheet,
    StyleProp,
    Text,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'


interface Props {
    style?: StyleProp<{}>
    title?: string
    actionText?: string
    onRequestClose?: () => void
    onAction?: () => void
}

export class ModalView extends React.Component<Props, {}> {
    public render() {
        const { title, onRequestClose, actionText, onAction, children } = this.props

        return (
            <View style={this.getStyles()}>
                <View style={styles.modal}>
                    <View style={styles.topBar}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableHighlight onPress={onRequestClose}>
                            <View style={styles.closeButton}>
                                <Text>X</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    {children}

                    <TouchableOpacity onPress={onAction}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionText}>{actionText}</Text>
                            <Text>X</Text>
                        </View>
                    </TouchableOpacity>
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
        width: '100%',
        paddingHorizontal: 18,
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: '#ffffff',
    },
    title: {
        color: 'rgb(124, 126, 128)',
        fontSize: 14,
        fontWeight: '600',
    },
    topBar: {
        width: '100%',
        height: 36,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(242,244,245)',
    },
    closeButton: {
        backgroundColor: 'rgb(225,228,230)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        width: 36,
    },
    actionButton: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 18,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600'
    },
})