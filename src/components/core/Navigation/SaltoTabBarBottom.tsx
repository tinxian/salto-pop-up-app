import React from 'react'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { NavigationScreenProps, NavigationRoute, NavigationState } from 'react-navigation';
import { RadioBar } from 'src/components/implementations/RadioBar/RadioBar';
import { NavigationIconTypes } from 'src/utils/icons';

interface State {
    activeIndex: number
}

export const SaltoTabBarBottom = withThemeContext(
    class SaltoTabBarBottom extends React.Component<NavigationScreenProps & ThemeInjectedProps, State> {

        public state: State = {
            activeIndex: 0,
        }

        public render() {
            return (
                <View style={this.getStyles()}>
                    <RadioBar />
                    <View style={styles.tabContainer}>
                        {this.renderTabs()}
                    </View>
                </View>

            )
        }

        private renderTabs() {
            const routes = this.props.navigation.state.routes

            return routes.map((route, index) => (
                <TouchableHighlight style={styles.toucharea} key={index} onPress={() => this.handleOnPress(index, route)}>
                    <Image style={this.getIconStyles(index)} source={NavigationIconTypes.home} />
                </TouchableHighlight>
            ))
        }

        private handleOnPress = (index: number, route: NavigationRoute<{}>) => {
            this.setState({ activeIndex: index })
            this.props.navigation.navigate(route.routeName)
        }

        private getIconStyles(index: number) {

            if (this.state.activeIndex === index) {
                return {
                    color: this.props.themeContext.theme.ActiveNavigationIconsColor,
                    tintColor: this.props.themeContext.theme.ActiveNavigationIconsColor,
                }
            }

            return undefined

        }

        private getStyles() {
            return [
                styles.container,
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

    }
})

const getActiveRouteState = function (route: NavigationState): NavigationState {
    if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
        return route
    }

    const childActiveRoute = route.routes[route.index] as NavigationState;
    return getActiveRouteState(childActiveRoute)
}