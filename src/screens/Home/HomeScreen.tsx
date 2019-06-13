import * as React from 'react';
import { Dimensions, FlatList, Image, ListRenderItemInfo, StatusBar, StyleProp, StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { EmptyComponent } from 'src/components/core/EmptyComponent/EmptyComponent';
import { PageHeader } from 'src/components/core/Header/PageHeader';
import { Logo } from 'src/components/core/Logo/Logo';
import { WidgetView } from 'src/components/core/Widgets/WidgetView';
import { ThemeInjectedProps, withThemeContext } from 'src/providers/ThemeProvider';
import { VideosInjectedProps } from 'src/providers/VideosProvider';
import { AnalyticsData } from 'src/services/Analytics';
import { widgets, WidgetType } from './widgets';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export const HomeScreen = withThemeContext(
    class HomeScreen extends React.Component<Props & ThemeInjectedProps & VideosInjectedProps, State> {

        public componentDidMount() {
            AnalyticsData.trackScreen('HomeScreen')
        }

        public render() {
            const { images } = this.props.themeContext.theme

            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={false} animated={false} />
                    <Image
                        style={this.getBackgroundStyles()}
                        source={images.HeaderBackgroundUrl}
                        resizeMode={'repeat'}
                    />
                    <Logo style={styles.logo} navigation={this.props.navigation} />
                    {this.renderList()}
                </View>
            )
        }

        private renderList() {
            const { theme } = this.props.themeContext

            return (
                <FlatList<WidgetType>
                    ListHeaderComponent={() => this.renderHeader()}
                    ListEmptyComponent={() => (
                        <EmptyComponent
                            theme={theme}
                            onPress={() => this.props.videosContext.refresh()}
                        />
                    )
                    }
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 12 }} />
                    )}
                    contentContainerStyle={this.getWrapperStyles()}
                    data={widgets}
                    keyExtractor={item => {
                        return item.id
                    }}
                    renderItem={item => this.renderWidgetItem(item)}
                />
            )
        }

        private renderHeader() {
            const { theme } = this.props.themeContext
            return (
                <PageHeader theme={theme} title={theme.content.general.EventName} />
            )
        }

        private renderWidgetItem(item: ListRenderItemInfo<WidgetType>) {
            const widget = item.item
            const { theme } = this.props.themeContext
            const { navigation } = this.props

            return (
                <WidgetView
                    theme={theme}
                    widget={widget}
                    navigation={navigation}
                >
                    {widget.element}
                </WidgetView>
            )
        }

        private getBackgroundStyles() {
            const { colors } = this.props.themeContext.theme
            return [
                { backgroundColor: colors.SaltoColor },
                styles.background,
            ]

        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
            ]
        }

        private getStyles() {
            const { style, themeContext } = this.props
            return [
                styles.container,
                { backgroundColor: themeContext.theme.colors.PageBackgroundColor },
                style,
            ]
        }
    }

)
export

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        background: {
            position: 'absolute',
            width: '100%',
            height: '50%',
        },
        wrapper: {
            width: '100%',
            height: '100%',
        },
        labelContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 24,
        },
        emptySpace: {
            height: 72,
            flex: 1,
        },
        logo: {
            position: 'absolute',
            top: 42,
            left: 12,
        },
        content: {
            minHeight: Dimensions.get('screen').height,
            paddingHorizontal: 12,
            borderRadius: 25,
            marginTop: 72,

        },
        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 24,
        },
    })
