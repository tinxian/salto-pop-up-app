import * as React from 'react';
import { StyleProp, StyleSheet, View, TouchableHighlight } from 'react-native';
import { LiveStreamDataType } from 'src/services/media';
import { Dispatcher } from 'src/utils/Dispatcher';
import { ThemeInjectedProps, withThemeContext } from 'src/providers/ThemeProvider';
import { PassedWidgetProps } from 'src/screens/Home/widgets';


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
                    <TouchableHighlight onPress={() => this.handleOnpress()}>
                        <View style={{ width: '100%', height: 40, backgroundColor: 'green' }}>

                        </View>
                    </TouchableHighlight>

                </View>
            )
        }

        private handleOnpress() {
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
