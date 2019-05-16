import * as React from 'react'
import { View, StyleSheet, StyleProp, Image, ScrollView, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation';
import { Label } from 'src/components/core/Label/Label';
import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem';
import { LivestreamItem } from 'src/components/implementations/LivestreamItem/LivestreamItem';
import { Title, TitleSizeType } from 'src/components/core/Typography/Title';
import { getEventMessage } from 'src/utils/date';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { isWithinRange } from 'date-fns';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { colors } from 'src/utils/colors';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export const HomeScreen = withThemeContext(
    class HomeScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public render() {
            const { LabelColor, LabelTextColor, TitleColor, TextColor } = this.props.themeContext.theme.colors
            const { HeaderBackgroundUrl } = this.props.themeContext.theme.images
            return (
                <View style={this.getStyles()}>
                    <Image
                        style={styles.background}
                        source={HeaderBackgroundUrl}
                        resizeMode={'repeat'}
                    />
                    <Image style={styles.logo} source={require("../../../../src/assets/images/logos/salto.png")} />

                    <View style={styles.wrapper} >
                        <ScrollView style={{ flex: 1 }}>
                            <View style={styles.emptySpace} />

                            <View style={this.getContentStyles()}>

                                <View style={styles.labelContainer}>
                                    <Title
                                        color={TitleColor}
                                        size={TitleSizeType.large}
                                    >
                                        Home
                                    </Title>
                                    <Label
                                        color={LabelColor}
                                        textColor={LabelTextColor}
                                        text={getEventMessage(new Date(), new Date())}
                                    />
                                </View>
                                <Paragraph textStyle={{ marginBottom: 24 }} color={TextColor}>
                                    Tijdens de jaarlijkse Pride Amsterdam week gaat SALTO op roze! Van 28 juli t/m 5 augustus worden SALTO1 en StadsFM omgedoopt tot PRIDE TV en PRIDE FM! Hou SALTO in de gaten voor alle updates en informatie over de programma's!
                                </Paragraph>
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

            if (isWithinRange(currentDate, new Date(), new Date())) {
                return (
                    <View>
                        <LivestreamItem
                            theme={theme}
                            title={'Pride door salto live'}
                            onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                        // thumbnail={require("../../../../src/assets/images/logos/salto.png")}
                        />
                    </View>
                )
            }

            return (
                <OnDemandVideoItem
                    theme={theme}
                    title={'Aftermovie pride 2018'}
                    poster={{
                        uri: 'blob:https://www.salto.nl/a186d03c-6eda-4ccb-9567-2adff821b23e'
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
    }
})
