import * as React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { SubTitle } from 'src/components/core/Typography/SubTitle';
import { Title } from 'src/components/core/Typography/Title';
import { ThemeInjectedProps, withThemeContext } from 'src/providers/ThemeProvider';
import { LiveStreamDataType, Media } from 'src/services/media';
import { getIcon } from 'src/utils/icons';

interface Props {
    uri?: string,
    active: boolean
    toggleRadio: () => void
    programData?: LiveStreamDataType
}

interface State {
    loading: boolean
    active: boolean
}

export const RadioScreen = withThemeContext(
    class RadioScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loading: true,
            active: false,
        }

        public player: Video | null

        public async componentDidMount() {

            const schedule = await Media.getScheduleByChannel(Media.getRadioChannelName())
            schedule.splice(4)

            this.setState({ loading: false })

        }

        public render() {
            const { toggleRadio, programData } = this.props

            if (!programData) {
                return (
                    <View style={this.getStyles()}>
                        <ActivityIndicator />
                    </View>
                )
            }

            return (
                <View style={this.getStyles()}>
                    <View style={styles.wrapper}>
                        <TouchableOpacity onPress={toggleRadio}>
                            <View style={styles.imageWrapper}>
                                {this.renderCover()}
                                <View style={styles.cover} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <View style={styles.title}>
                                {this.renderSongInfo()}
                            </View>
                            {this.renderControls()}
                        </View>
                    </View>
                </View>
            )
        }

        private renderControls() {
            const { loading } = this.state
            const { themeContext, active } = this.props

            if (loading) {
                return <ActivityIndicator />
            }

            return (
                <View style={styles.controls}>
                    <Icon
                        name={!active ? getIcon('play') : getIcon('square')}
                        color={themeContext.theme.colors.RadioPlayerControlsColor}
                        size={40}
                    />
                </View>
            )
        }

        private renderCover() {
            const { programData } = this.props
            const { loading } = this.state

            if (loading || !programData) {
                return null
            }

            return <Image style={styles.image} source={{ uri: programData.logo }} />
        }

        private renderSongInfo() {
            const { programData } = this.props
            const { colors } = this.props.themeContext.theme

            if (!programData) {
                return <ActivityIndicator />
            }

            if (!programData.music) {
                return (
                    <View style={{ flexWrap: 'wrap' }}>
                        <Title color={colors.TitleColor}>{programData.title}</Title>
                    </View>
                )
            }

            return (
                <View style={{ flexWrap: 'wrap' }}>
                    <Title color={colors.TitleColor}>{programData.title}</Title>
                    {programData.music.title && (<Paragraph color={colors.TextColor}>{programData.music.title}</Paragraph>)}
                    {programData.music.artists && programData.music.artists.map((item, key) => (
                        <SubTitle key={key} color={colors.SubTitleColor}>{item}</SubTitle>
                    ))}
                </View>
            )
        }

        private getStyles() {
            const { themeContext } = this.props
            return [
                styles.container,
                { backgroundColor: themeContext.theme.colors.BottomDrawerColor },
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    wrapper: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        paddingVertical: 15,
    },
    controls: {
        flexDirection: 'column',

        marginTop: 15,
        marginBottom: 10,
        borderRadius: 100,
    },
    imageWrapper: {
        height: 150,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    cover: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.3,
        borderRadius: 16,
    },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 16,
    },
})
