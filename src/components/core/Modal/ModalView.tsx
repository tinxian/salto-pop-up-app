import React from 'react'

import {
    View,
    StyleSheet,
    StyleProp,
    Text,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { getIcon } from 'src/utils/icons';
import { ThemeType } from 'src/services/theme';


interface Props {
    style?: StyleProp<{}>
    title?: string
    actionText?: string
    onRequestClose?: () => void
    onAction?: () => void
    theme: ThemeType
}

export class ModalView extends React.Component<Props, {}> {
    public render() {
        const { actionText, onAction, children, theme } = this.props

        return (
            <View style={this.getStyles()}>
                <View style={styles.modal}>
                    {children}

                    <TouchableOpacity onPress={onAction}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionText}>{actionText}</Text>
                            <Icon
                                name={getIcon('arrow-dropright')}
                                color={theme.colors.TextColor}
                                size={22}
                            />
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
        borderRadius: 16,
        overflow: 'hidden',
    },
    title: {
        color: 'rgb(124, 126, 128)',
        fontSize: 14,
        fontWeight: '600',
    },
    topBar: {
        width: '100%',
        height: 36,
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