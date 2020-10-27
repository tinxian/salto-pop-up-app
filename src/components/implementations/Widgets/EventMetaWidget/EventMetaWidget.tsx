import * as React from 'react'
import { StyleProp, StyleSheet, View } from 'react-native'
import { Label } from 'src/components/core/Label/Label'
import { Paragraph } from 'src/components/core/Typography/Paragraph'
import { ThemeContextType } from 'src/services/theme'
import { getEventMessage } from 'src/utils/date'

interface Props {
    style?: StyleProp<{}>
    themeContext: ThemeContextType
}

interface State {
    loading: boolean
    active: boolean
}

export class EventMetaWidget extends React.Component<Props, State> {

    public state: State = {
        loading: false,
        active: false,
    }

    public render() {
        const { themeContext } = this.props
        const { theme } = themeContext

        if (theme.content.App.showDays === false) {
            return (
            <View style={this.getStyles()}>
                <View style={styles.introText}>
                    <Paragraph color={theme.colors.TitleColor}>
                        {theme.content.general.AppIntroduction}
                    </Paragraph>
                </View>
            </View>
            )
        } else {
            return(
        <View style={this.getStyles()}>
            <View style={styles.introText}>
                    <Paragraph color={theme.colors.TitleColor}>
                        {theme.content.general.AppIntroduction}
                    </Paragraph>
            </View>
            <View style={styles.labelContainer}>
                    <Label
                        backgroundColor={theme.colors.LabelBackgroundColor}
                        borderColor={theme.colors.LabelBorderColor}
                        text={getEventMessage(
                            new Date(theme.content.App.startDate),
                            new Date(theme.content.App.endDate)
                        )}
                    />
                </View>
            </View>
            )
        }
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
    },
    labelContainer: {
        flexDirection: 'row',
    },
    introText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12,
    },
})
