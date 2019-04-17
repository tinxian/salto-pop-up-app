import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
    Text,
    TouchableHighlight,
    Platform,
    Linking,
    Button,
} from 'react-native'
import { environment } from 'src/services/environment'
import { WebViewImage } from '../Components/WebView/WebViewImage'
import { namespaceLocalize } from 'src/services/LocalizationService'
import { colors } from 'src/utils/colors'
import Share from 'react-native-share';

interface Props {
    style?: StyleProp<{}>
    onKitchensink: () => void
}

interface State { }

export class Intro extends React.Component<Props, State> {

    private loc = namespaceLocalize(t => t.Boilerplate)

    public render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.loc(t => t.Title)}</Text>
                </View>
                {this.renderContent()}
                {this.renderButton()}
            </View>
        )
    }

    private renderContent() {
        if (environment.development) {
            return this.renderInstructions()
        }

        return this.renderIntroduction()
    }

    private renderIntroduction() {
        return (
            <React.Fragment>
                <Text style={styles.subtitle}>{this.loc(t => t.Introduction.SubTitle)}</Text>
                <View style={styles.instructions}>
                    {this.renderResources()}
                </View>
            </React.Fragment>
        )
    }

    private renderResources() {
        return (
            <React.Fragment>
                <TouchableHighlight
                    style={{ marginBottom: 8 }}
                    onPress={() => Linking.openURL(this.loc(t => t.Introduction.Resources.Bitrise.Url))}
                >
                    <WebViewImage
                        uri={this.loc(t => t.Introduction.Resources.Bitrise.Image)}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => Linking.openURL(this.loc(t => t.Introduction.Resources.GitHub.Url))}
                >
                    <View style={styles.badge}>
                        <Text
                            style={[
                                styles.text, {
                                    fontWeight: '700',
                                    color: '#fff',
                                    fontSize: 12,
                                    lineHeight: 20,
                                },
                            ]}
                        >
                            {this.loc(t => t.Introduction.Resources.GitHub.Title)}
                        </Text>
                        <View
                            style={{
                                backgroundColor: '#0366d6',
                                height: '100%',
                                width: 20,
                                alignSelf: 'flex-end',
                                marginLeft: 'auto',
                                padding: 4,
                            }}
                        >
                            {/* <Image
                                source={require('../../assets/images/GitHub/icon.png')}
                                style={{
                                    width: 12,
                                    height: 12,
                                    tintColor: '#fff',
                                }}
                            /> */}
                        </View>
                    </View>
                </TouchableHighlight>
            </React.Fragment>
        )
    }

    private renderInstructions() {
        return Platform.select({
            ios: (
                <React.Fragment>
                    <Text style={styles.subtitle}>{this.loc(t => t.Instructions.Edit)}</Text>
                    <View style={styles.instructions}>
                        <View style={[styles.boilerplate, { marginBottom: 16 }]}>
                            <Text style={styles.instructionsTitle}>{this.loc(t => t.Instructions.Ios.Simulator)}</Text>
                            <Text style={styles.text}>{this.loc(t => t.Instructions.Ios.Reload)}</Text>
                            <Text style={styles.text}>{this.loc(t => t.Instructions.Ios.Menu)}</Text>
                        </View>
                        <View style={styles.boilerplate}>
                            <Text style={styles.instructionsTitle}>{this.loc(t => t.Instructions.Ios.Device)}</Text>
                            <Text style={styles.text}>{this.loc(t => t.Instructions.Ios.Shake)}</Text>
                        </View>
                    </View>
                </React.Fragment>
            ),
            android: (
                <React.Fragment>
                    <Text style={styles.subtitle}>{this.loc(t => t.Instructions.Edit)}</Text>
                    <View style={styles.instructions}>
                        <View style={[styles.boilerplate, { marginBottom: 16 }]}>
                            <Text style={styles.instructionsTitle}>{this.loc(t => t.Instructions.Android.Emulator)}</Text>
                            <Text style={styles.text}>{this.loc(t => t.Instructions.Android.Reload)}</Text>
                            <Text style={styles.text}>{this.loc(t => t.Instructions.Android.Menu)}</Text>
                        </View>
                        <View style={styles.boilerplate}>
                            <Text style={styles.instructionsTitle}>{this.loc(t => t.Instructions.Android.Device)}</Text>
                            <Text style={styles.text}>{this.loc(t => t.Instructions.Android.Shake)}</Text>
                        </View>
                    </View>
                </React.Fragment>
            ),
        })
    }

    private renderButton() {
        const { onKitchensink } = this.props
        return (
            <TouchableHighlight onPress={() => onKitchensink()}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {this.loc(t => t.Instructions.KitchenSink)}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.white,
        padding: 24,
    },
    button: {
        backgroundColor: colors.buttons.active,
        padding: 16,
        paddingHorizontal: 24,
        borderRadius: 5,
    },
    badge: {
        width: 70,
        height: 20,
        backgroundColor: colors.background.darkGray,
        justifyContent: 'center',
        paddingLeft: 5,
        borderRadius: 3,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    buttonText: {
        color: colors.buttons.activeText,
        fontWeight: '700',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
    },
    title: {
        fontWeight: '700',
        fontSize: 42,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },
    instructions: {
        padding: 2,
        marginBottom: 48,
    },
    boilerplate: {
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border.lightGray,
        borderRadius: 5,
    },
    instructionsTitle: {
        color: colors.typography.text,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    text: {
        color: colors.typography.text,
    },
})
