import * as React from 'react'
import { View, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native'
import Video from 'react-native-video'
import { LiveStreamDataType, Media } from 'src/services/media'
import Icon from 'react-native-vector-icons/Ionicons'
import { getIcon } from 'src/utils/icons'
import { ScheduleType } from 'src/services/videos'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'
import { InformationList } from 'src/components/core/List/InformationList'
import { SubTitle } from 'src/components/core/Typography/SubTitle'
import { Title } from 'src/components/core/Typography/Title'
import { Paragraph } from 'src/components/core/Typography/Paragraph';

interface Props {
    uri?: string,
    active: boolean
    toggleRadio: () => void
    programData?: LiveStreamDataType
}

interface State {
    loading: boolean
    schedule: ScheduleType[]
    active: boolean
}

export const RadioScreen = withThemeContext(
    class RadioScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loading: true,
            active: false,
            schedule: [],
        }

        public player: Video | null

        public async componentDidMount() {

            const schedule = await Media.getScheduleByChannel(Media.getRadioChannelName())
            schedule.splice(4)

            this.setState({ schedule, loading: false })

        }

        public render() {
            const { schedule } = this.state
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
                    <StatusBar hidden={true} animated={true} />
                    <View style={styles.wrapper}>
                        <View style={styles.info}>
                            <View style={styles.title}>
                                {this.renderSongInfo()}
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggleRadio}>
                            <View style={styles.imageWrapper}>
                                {this.renderCover()}
                                {this.renderControls()}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <InformationList
                        data={schedule}
                        theme={this.props.themeContext.theme}
                    />
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
                return <ActivityIndicator />
            }

            return (
                <>
                    <Image style={styles.image} source={{ uri: programData.logo }} />
                    <View style={styles.cover} />
                </>
            )
        }

        private renderSongInfo() {
            const { programData } = this.props
            const { colors } = this.props.themeContext.theme

            if (!programData) {
                return <ActivityIndicator />
            }

            if (!programData.music) {
                return (
                    <View style={{ flexWrap: 'wrap', width: Dimensions.get('window').width / 1.5 }}>
                        <Title color={colors.TitleColor}>{programData.title}</Title>
                    </View>
                )
            }

            return (
                <View style={{ flexWrap: 'wrap', width: Dimensions.get('window').width / 1.5 }}>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flexDirection: 'column',

    },
    title: {
        paddingVertical: 15,
    },
    controls: {
        flexDirection: 'column',

        paddingTop: 15,
        paddingBottom: 10,
    },
    imageWrapper: {
        height: 80,
        width: 80,
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
