
import React from 'react'
import { Platform } from 'react-native'

import { StyleSheet, StyleProp, View } from 'react-native'
import { Title } from '../Typography/Title';
import { Paragraph } from '../Typography/Paragraph';
import { ThemeType } from 'src/services/theme';


interface Props {
    style?: StyleProp<{}>
    theme: ThemeType
}

export class EventAttentionModal extends React.Component<Props, {}> {
    public render() {
        const { theme } = this.props
        const store = Platform.OS === 'android' ? 'play store' : 'app store'

        return (
            <View style={this.getStyles()}>
                <View>
                    <View style={styles.content}>
                        <View style={{ minHeight: 40 }}>
                            <Title color={theme.colors.TextColor}>Dit evenement is voorbij</Title>
                            <Paragraph
                                color={theme.colors.TextColor}
                            >
                                De app zal geen live content meer bevatten.
                                Hou de {store} in de gaten voor het volgende evenement
                            </Paragraph>
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
    content: {
        padding: 18,
        paddingTop: 28,
    },
})