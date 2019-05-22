import * as React from 'react'
import { View, StyleSheet, StyleProp, Image, ScrollView, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Label } from 'src/components/core/Label/Label'
import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem'
import { LivestreamItem } from 'src/components/implementations/LivestreamItem/LivestreamItem'
import { Title, TitleSizeType } from 'src/components/core/Typography/Title'
import { getEventMessage } from 'src/utils/date'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { isWithinRange } from 'date-fns'
import { Paragraph } from 'src/components/core/Typography/Paragraph'
import { withVideosContext, VideosInjectedProps } from 'src/providers/VideosProvider'

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export const HomeScreen = withThemeContext(withVideosContext(
    class HomeScreen extends React.Component<Props & ThemeInjectedProps & VideosInjectedProps, State> {
        public render() {
            const { themeContext } = this.props
            const { colors, images, content } = themeContext.theme

            return (
                <View style={this.getStyles()}>
                    <Image
                        style={this.getBackgroundStyles()}
                        source={images.HeaderBackgroundUrl}
                        resizeMode={'repeat'}

                    />
                    <Image style={styles.logo} source={require('../../../../src/assets/images/logos/salto.png')} />

                    <View style={styles.wrapper} >
                        <ScrollView style={{ flex: 1 }}>
                            <View style={styles.emptySpace} />

                            <View style={this.getContentStyles()}>

                                <View style={styles.labelContainer}>
                                    <Title
                                        color={colors.TitleColor}
                                        size={TitleSizeType.large}
                                    >
                                        Home
                                    </Title>
                                    <View>
                                        <Label
                                            color={colors.LabelColor}
                                            textColor={colors.LabelTextColor}
                                            text={getEventMessage(new Date(content.App.startDate), new Date(content.App.endDate))}
                                        />
                                    </View>

                                </View>
                                {this.getMedia()}
                                <View style={styles.introText}>
                                    <Paragraph color={colors.TitleColor}>
                                        {themeContext.theme.content.general.AppIntroduction}
                                    </Paragraph>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )
        }

        private getMedia() {
            const { theme } = this.props.themeContext
            const { episodes } = this.props.videosContext
            const currentDate = new Date()
            const afterMovie = episodes.find(episode => episode.id === theme.content.general.AftermovieId)

            if (isWithinRange(currentDate, theme.content.App.startDate, theme.content.App.endDate)) {
                return (
                    <LivestreamItem
                        theme={theme}
                        onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                        thumbnail={theme.images.defaultThumbnail}
                    />
                )
            }

            if (afterMovie) {
                return (
                    <OnDemandVideoItem
                        theme={theme}
                        title={`Aftermovie ${theme.content.general.EventName}`}
                        onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { item: afterMovie, data: episodes })}
                        poster={theme.images.defaultThumbnail}
                    />
                )
            }

            return null
        }

        private getBackgroundStyles() {
            const { colors } = this.props.themeContext.theme
            return [
                { backgroundColor: colors.SaltoColor },
                styles.background,
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

        private getContentStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
            ]
        }
    }

))

const styles = StyleSheet.create({
    container: {

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
    introText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    content: {
        paddingHorizontal: 12,
        height: Dimensions.get('screen').height,
        borderRadius: 25,
    },
    logo: {
        position: 'absolute',
        top: 60,
        left: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
    emptySpace: {
        height: 100,
        flex: 1,
    },
    titleContainer: {
        marginBottom: 12,
    },
})
