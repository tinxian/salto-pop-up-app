import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, FlatList, TouchableHighlight, Image, Dimensions, TouchableOpacity } from 'react-native'
import { getIcon } from 'src/utils/icons'
import { NavigationScreenProps } from 'react-navigation'
import { Title } from 'src/components/core/Navigation/NavigationIcon'
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'react-native'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {

}

export const SettingsScreen = withThemeContext(
    class SettingsScreen extends React.Component<Props & ThemeInjectedProps, State> {

        public render() {
            return (
                <View style={this.getStyles()}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name={getIcon('close')} size={50}/>
                    </TouchableOpacity>
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
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
