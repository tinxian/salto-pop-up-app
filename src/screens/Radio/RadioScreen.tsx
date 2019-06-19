import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
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
    onToggleRadio?: (active: boolean) => void
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
            active: this.props.active,
        }

        public player: Video | null

        public async componentDidMount() {
            this.setState({ loading: false })
        }

        public render() {
            const { programData } = this.props
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
                        <View style={styles.imageWrapper}>
                            {this.renderSongImage()}
                        </View>
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
            const { loading, active } = this.state
            const { themeContext } = this.props

            if (loading) {
                return <ActivityIndicator />
            }

            return (
                <TouchableWithoutFeedback onPress={this.handleControlsPress}>
                    <View style={this.getControlStyles()}>
                        <Icon
                            style={{ marginLeft: 2, marginTop: 2 }}
                            name={!active ? getIcon('play') : getIcon('square')}
                            color={themeContext.theme.colors.BottomDrawerColor}
                            size={40}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        private renderSongImage() {
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
                <View style={styles.musicInfoWrapper}>
                    <Title color={colors.TitleColor}>
                        {programData.title}
                    </Title>

                    {programData.music.title && (
                        <Paragraph color={colors.TextColor}>
                            {programData.music.title}
                        </Paragraph>
                    )}
                    {this.renderArtist(programData.music.artist)}
                </View>
            )
        }

        private renderArtist(artist?: string[]) {
            const { colors } = this.props.themeContext.theme

            if (!artist) {
                return null
            }

            return artist && artist.map((item, key) => (
                <SubTitle
                    key={key}
                    color={colors.SubTitleColor}
                >
                    {item}
                </SubTitle>
            ))
        }

        private handleControlsPress = () => {
            const { active } = this.state

            if (active) {
                this.setState({ active: false })
                Media.stopOtherMedia()
            } else {
                this.setState({ active: true })
                Media.startRadio()
            }

        }

        private getControlStyles() {
            const { themeContext } = this.props
            return [
                styles.controls,
                { backgroundColor: themeContext.theme.colors.RadioPlayerControlsColor },
            ]
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
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        overflow: 'hidden',
    },
    wrapper: {
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 52,
        width: 52,
        borderRadius: 52,

    },
    imageWrapper: {
        height: 300,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    musicInfoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
