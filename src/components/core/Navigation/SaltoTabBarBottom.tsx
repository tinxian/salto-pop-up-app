import React from 'react'
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { NavigationScreenProps, NavigationRoute, NavigationState } from 'react-navigation';
import { RadioBar } from 'src/components/implementations/RadioBar/RadioBar';
import Icon from 'react-native-vector-icons/Ionicons'

interface State {
    activeIndex: number
}

export const SaltoTabBarBottom = withThemeContext(
    class SaltoTabBarBottom extends React.Component<NavigationScreenProps & ThemeInjectedProps, State> {

        public state: State = {
            activeIndex: 0,
        }

        public render() {
            const { theme } = this.props.themeContext
            return (
                <View style={this.getStyles()}>
                    <RadioBar
                        theme={theme}
                        onPressBar={this.navigateToRadioScreen}
                    />
                    <View style={styles.tabContainer}>
                        {this.renderTabs()}
                    </View>
                </View>

            )
        }

        private renderTabs() {
            const routes = this.props.navigation.state.routes

            return routes.map((route, index) => (
                <TouchableOpacity style={styles.toucharea} key={index} onPress={() => this.handleOnPress(index, route)}>
                    {/* <Image style={this.getIconStyles(index)} source={NavigationIconTypes.home} /> */}
                    <Icon
                        name={this.getIcon(route)}
                        color={this.getIconColor(index)}
                        size={32}
                    />
                </TouchableOpacity>
            ))
        }

        private handleOnPress = (index: number, route: NavigationRoute<{}>) => {
            this.setState({ activeIndex: index })
            this.props.navigation.navigate(route.routeName)
        }

        private navigateToRadioScreen = () => {
            const { navigation } = this.props
            navigation.navigate('RadioScreen')
        }

        private getIcon(route: NavigationRoute<{}>) {
            const prefix = Platform.OS === 'ios' ? 'ios' : 'md'
            const navIcons = {
                HomeScreen: `${prefix}-home`,
                OnDemandVideo: `${prefix}-tv`,
                MoreScreen: `${prefix}-more`,

            }

            return navIcons[route.routeName]

        }

        private getIconColor(index: number) {

            if (this.state.activeIndex === index) {
                return this.props.themeContext.theme.colors.NavigationIconsActiveColor
            }

            return this.props.themeContext.theme.colors.NavigationIconsColor

        }

        private getStyles() {
            return [
                styles.container,
                { backgroundColor: this.props.themeContext.theme.colors.NavigationBackgroundColor },
            ]
        }
    })

const styles = StyleSheet.create({
    container: {

    },
    tabContainer: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    toucharea: {
        height: '100%',
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const getActiveRouteState = function (route: NavigationState): NavigationState {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
        return route
    }

    const childActiveRoute = route.routes[route.index] as NavigationState;
    return getActiveRouteState(childActiveRoute)
}