import * as React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { LiveStreamDataType, Media } from 'src/services/media';
import { withThemeContext } from 'src/providers/ThemeProvider';
import { PassedWidgetProps } from 'src/screens/Home/widgets';
import { Button } from 'src/components/core/Button/Button';


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

        public state: State = {
            loading: false,
            active: false,
            programData: undefined,
        }

        public render() {
            const { theme } = this.props.themeContext

            return (
                <View style={this.getStyles()}>
                    <Button
                        theme={theme}
                        onPress={() => this.handleButtonClick()}
                    >
                        Luister naar PrideFM
                    </Button>
                </View>
            )
        }

        private handleButtonClick() {
            Media.openRadioScreen()
            Media.startRadio()
        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
                style,
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
    }
})
