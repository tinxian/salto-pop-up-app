import * as React from 'react'
import { View, StyleSheet, StyleProp, Image, ScrollView, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation';
import { Label } from 'src/components/core/Label/Label';
import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem';
import { LivestreamItem } from 'src/components/implementations/LivestreamItem/LivestreamItem';
import { Title } from 'src/components/core/Typography/Title';
import { getEventMessage } from 'src/utils/date';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { isWithinRange } from 'date-fns';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export const HomeScreen = withThemeContext(
    class HomeScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public render() {
            const { LabelColor, LabelTextColor } = this.props.themeContext.theme
            return (
                <View style={this.getStyles()}>
                    <Image
                        style={styles.background}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT64sLpyaGTic1h0Vu8qMSBA6BNXyR6zxqd4xh-4FUcl99kt4hk' }}
                    />
                    <Image style={styles.logo} source={require("../../../../src/assets/images/logos/salto.png")} />

                    <View style={styles.wrapper} >
                        <ScrollView style={{ flex: 1 }}>
                            <View style={styles.emptySpace} />

                            <View style={this.getContentStyles()}>

                                <View style={styles.labelContainer}>
                                    <Title>Home</Title>
                                    <Label color={LabelColor} textColor={LabelTextColor} text={getEventMessage(new Date(), new Date())} />
                                </View>
                                {this.getMedia()}

                            </View>
                        </ScrollView>
                    </View>

                </View>
            )
        }

        private getMedia() {
            const { themeContext } = this.props
            const currentDate = new Date()

            if (isWithinRange(currentDate, new Date(), new Date())) {
                return (
                    <View>
                        <LivestreamItem
                            textColor={themeContext.theme.TextColor}
                            title={'Pride door salto live'}
                            onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                        // thumbnail={require("../../../../src/assets/images/logos/salto.png")}
                        />
                    </View>
                )
            }

            return (
                <OnDemandVideoItem
                    theme={themeContext.theme}
                    title={'Aftermovie pride 2018'}
                    poster={{
                        uri: 'blob:https://www.salto.nl/a186d03c-6eda-4ccb-9567-2adff821b23e'
                    }}
                />
            )

        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
                style,
            ]
        }

        private getContentStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme
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
        paddingHorizontal: 22,
        height: Dimensions.get('screen').height,
        borderRadius: 8,
    },
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
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
