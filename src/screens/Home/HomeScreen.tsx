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

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export const HomeScreen = withThemeContext(
    class HomeScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public render() {
            const { themeContext } = this.props
            const { colors, images, content } = themeContext.theme

            return (
                <View style={this.getStyles()}>
                    <Image
                        style={styles.background}
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
                                    <Label
                                        color={colors.LabelColor}
                                        textColor={colors.LabelTextColor}
                                        text={getEventMessage(new Date(content.App.startDate), new Date(content.App.endDate))}
                                    />
                                </View>
                                <View style={styles.introText}>
                                    <Paragraph color={colors.TitleColor}>
                                        {themeContext.theme.content.general.AppIntroduction}
                                    </Paragraph>
                                </View>
                                {this.getMedia()}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )
        }

        private getMedia() {
            const { theme } = this.props.themeContext
            const currentDate = new Date()

            if (isWithinRange(currentDate, theme.content.App.startDate, theme.content.App.endDate)) {
                return (
                    <LivestreamItem
                        theme={theme}
                        onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                        thumbnail={theme.images.defaultThumbnail}
                    />
                )
            }

            return (
                <OnDemandVideoItem
                    theme={theme}
                    title={`Aftermovie ${theme.content.general.EventName}`}
                    poster={{
                        uri: 'blob:https://www.salto.nl/a186d03c-6eda-4ccb-9567-2adff821b23e',
                    }}
                />
            )

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

)

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
        top: 20,
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
