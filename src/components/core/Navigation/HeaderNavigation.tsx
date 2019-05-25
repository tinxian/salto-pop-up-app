import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { NavigationScreenProps } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import { Title } from '../Typography/Title';

interface Props extends NavigationScreenProps {
    title: string
}

export const HeaderNavigation = withThemeContext(
    class HeaderNavigation extends React.Component<Props & ThemeInjectedProps, {}> {

        public render() {
            const { theme } = this.props.themeContext
            const { navigation, title } = this.props
            return (
                <View style={this.getStyles()}>
                    <TouchableOpacity style={styles.toucharea} onPress={() => navigation.goBack(null)}>
                        <Icon
                            name={getIcon('arrow-round-back')}
                            color={theme.colors.HeaderBackButtonColor}
                            size={40}
                        />
                    </TouchableOpacity>
                    <Title textStyle={styles.title} color={theme.colors.HeaderTitleText}>
                        {title}
                    </Title>
                </View>
            )
        }
        private getStyles() {
            return [
                styles.container,
                { backgroundColor: this.props.themeContext.theme.colors.HeaderBackground },
            ]
        }
    })

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    title: {
        top: -2,
        marginLeft: 4,

    },
    toucharea: {
        paddingHorizontal: 12,
        height: '100%',
        justifyContent: 'center',
    }
})
