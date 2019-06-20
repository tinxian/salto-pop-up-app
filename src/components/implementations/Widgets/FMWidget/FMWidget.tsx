import * as React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Button } from 'src/components/core/Button/Button';
import { PassedWidgetProps } from 'src/screens/Home/widgets';
import { LiveStreamDataType, Media } from 'src/services/media';


interface Props {
    style?: StyleProp<{}>
}

interface State {
    loading: boolean
    active: boolean
    programData?: LiveStreamDataType
}

export class FMWidget extends React.Component<Props & PassedWidgetProps, State> {

    public state: State = {
        loading: false,
        active: false,
        programData: undefined,
    }

    public render() {
        const { themeContext } = this.props

        return (
            <View style={this.getStyles()}>
                <Button
                    theme={themeContext.theme}
                    onPress={() => this.handleButtonClick()}
                >
                    Luister naar {themeContext.theme.content.general.RadioName}
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


const styles = StyleSheet.create({
    container: {
    }
})
