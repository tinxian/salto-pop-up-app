import * as React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Label } from 'src/components/core/Label/Label';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { LiveStreamDataType } from 'src/services/media';
import { getEventMessage } from 'src/utils/date';
import { ThemeInjectedProps } from 'src/providers/ThemeProvider';


interface Props {
    style?: StyleProp<{}>
}

interface State {
    loading: boolean
    active: boolean
    programData?: LiveStreamDataType
}


export class EventMetaWidget extends React.Component<Props & ThemeInjectedProps, State> {

    public state: State = {
        loading: false,
        active: false,
        programData: undefined,
    }

    public render() {
        const { theme } = this.props.themeContext

        return (
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
