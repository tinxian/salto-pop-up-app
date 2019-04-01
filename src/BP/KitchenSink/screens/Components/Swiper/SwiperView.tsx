import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
    Image,
    Text,
    ImageSourcePropType,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Title } from 'src/BP/Components/Typography/Title'
import { Page } from 'src/BP/Components/Page/Page'
import { Swiper } from 'src/BP/Components/Swiper/Swiper'
import { Paragraph } from 'src/BP/Components/Typography/Paragraph'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}
// tslint:disable:jsx-use-translation-function
export interface SlideShowDataType {
    title: String,
    caption: String,
    source: ImageSourcePropType
}

const stubData: SlideShowDataType[] = [
    {
        title: 'my title',
        caption: 'my caption',
        source: { uri: 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg' },
    },
    {
        title: 'my title',
        caption: 'my caption',
        source: { uri: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg' },
    },
    {
        title: 'my title',
        caption: 'my caption',
        source: { uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681' },
    },
    {
        title: 'my title',
        caption: 'my caption',
        source: { uri: 'https://beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg' },
    },
]

export class SwiperView extends React.Component<Props, State> {

    public render() {
        return (
            <React.Fragment>
                <Page>

                    <Title>Swiper</Title>
                    <View style={styles.display}>
                        <Paragraph>
                            standard component
                        </Paragraph>
                        <Swiper
                            data={stubData}
                            renderComponent={item => (
                                <Image
                                    source={item.source}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            )}
                        />

                        <Swiper
                            data={stubData}
                            renderComponent={item => (
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 200,
                                            height: 150,
                                            backgroundColor: 'yellow',
                                        }}
                                    >
                                        <Image
                                            source={item.source}
                                            style={{ flex: 1 }}
                                        />
                                        <Text>my custom component thingy {item.title}</Text>
                                    </View>
                                </View>
                            )}
                        />

                        <Paragraph>
                            custom
                        </Paragraph>

                        <Swiper
                            data={stubData}
                            renderComponent={item => (
                                <Image
                                    source={item.source}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            )}
                            renderLeftArrow={ () => (
                                <Image
                                    style={{ width: 12, height: 12 }}
                                    // tslint:disable: max-line-length
                                    // tslint:disable: ter-max-len
                                    source={{ uri: 'http://www.5ivetacos.com/wp-content/uploads/2018/07/arrow-pumpkin-stencil-puter-icons-arrow-clip-art-arrow-pointing-left-png-of-arrow-pumpkin-stencil.jpg' }}
                                />
                            )}
                            renderRightArrow={() => (
                                <Image
                                    style={{ width: 12, height: 12 }}
                                    source={{ uri: 'https://www.clipartmax.com/png/middle/27-279736_arrow-pointing-right-cool-arrows-pointing-right.png' }}
                                />
                            )}
                            renderDots={isActive => (
                                isActive ? (
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                    />
                                ) : (
                                    <View
                                        style={[
                                            styles.indicator,
                                        ]}
                                    />
                                )
                            )}
                        />

                        <Paragraph>
                            if you need partially visible items swiper https://github.com/kkemple/react-native-sideswipe/issues

                        </Paragraph>
                    </View>
                </Page>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    display: {
        paddingHorizontal: 16,
    },
    indicator: {
        margin: 3,
        opacity: 0.9,
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
    },
})
