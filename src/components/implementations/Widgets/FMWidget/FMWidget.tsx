import * as React from 'react';
import { StyleProp, StyleSheet, View, TouchableHighlight } from 'react-native';
import { LiveStreamDataType, Media, Media } from 'src/services/media';
import { Dispatcher } from 'src/utils/Dispatcher';
import { withThemeContext } from 'src/providers/ThemeProvider';
import { PassedWidgetProps } from 'src/screens/Home/widgets';
import { RadioBar } from '../../RadioBar/RadioBar';


interface Props {
    style?: StyleProp<{}>
}

interface State {
    loading: boolean
    active: boolean
    programData?: LiveStreamDataType
}

export const FMWidget = withThemeContext(
    class FMWidget extends React.Component<Props & PassedWidgetProps, State> {
        public static radioDispatcher = new Dispatcher()

        public state: State = {
            loading: false,
            active: false,
            programData: undefined,
        }

        public render() {

            return (
                <View style={this.getStyles()}>
                    <TouchableHighlight onPress={() => this.handleButtonClick()}>
                        <View style={{ width: '100%', height: 40, backgroundColor: 'green' }} />
                    </TouchableHighlight>

                </View>
            )
        }

        private handleButtonClick() {
            Media.openRadioScreen()
        }

        private getStyles() {
            const { style, themeContext } = this.props
            return [
                { backgroundColor: themeContext.theme.colors.RadioPlayerBackgroundColor },
                styles.container,
                style,
            ]
        }
    }
)
export

    const styles = StyleSheet.create({
        container: {
        }
    })
