import * as React from 'react'
import { View, StyleSheet, StyleProp, StatusBar, Dimensions, TouchableHighlight, FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import VideoPlayer from 'react-native-video-controls'
import { EpisodeType } from 'src/services/videos'
import { Title } from 'src/components/core/Typography/Title'
import Video from 'react-native-video'
import { ExpandableContainer } from 'src/components/core/Animation/ExpandableContainer';
import Share from 'react-native-share';
import { Media } from 'src/services/media';

import { getIcon } from 'src/utils/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { Label } from 'src/components/core/Label/Label';
import { format } from 'date-fns';
import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem';
import { SubTitle } from 'src/components/core/Typography/SubTitle';
import { Paragraph } from 'src/components/core/Typography/Paragraph';

interface Params {
    item: EpisodeType,
    data: EpisodeType[],
}

interface Props extends NavigationScreenProps<Params> {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loading: boolean
    fullScreen: boolean
    height: number
}
export const OnDemandVideoScreen = withThemeContext(
    class OnDemandVideoScreen extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            loading: true,
            fullScreen: false,
            height: Dimensions.get('window').height,
        }

        public player: Video | null

        public componentDidMount() {
            Media.stopOtherMedia()
            StatusBar.setHidden(true, 'fade')
        }

        public componentWillUnmount() {
            StatusBar.setHidden(false, 'fade')
        }

        public render() {
            const { fullScreen, height } = this.state
            const { theme } = this.props.themeContext
            const item = this.props.navigation.getParam('item')
            const data = this.getRelevantVideosFromEpisode()

            return (
                <View style={this.getStyles()} onLayout={this.handleLayoutChange}>
                    <StatusBar hidden={true} animated={true} />
                    <ExpandableContainer
                        expand={fullScreen}
                        startHeight={300}
                        maxHeight={height}
                        style={styles.videoContainer}
                    >
                        <VideoPlayer
                            style={{ flex: 1 }}
                            ref={(ref: Video) => this.player = ref}
                            source={{ uri: item.streams.mp4 }}
                            onBack={() => this.props.navigation.goBack()}
                            onEnterFullscreen={this.handleFullScreenToggle}
                            onExitFullscreen={this.handleFullScreenToggle}
                        />
                    </ExpandableContainer>

                    <FlatList
                        ListHeaderComponent={() => this.renderMetaHeader(item)}
                        data={data}
                        contentContainerStyle={this.getWrapperStyles()}
                        keyExtractor={item => {
                            return item.id
                        }}
                        renderItem={({ item }) => (
                            <OnDemandVideoItem
                                onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { item, data })}
                                poster={{ uri: item.poster }}
                                theme={theme}
                                title={item.title}
                                programName={item.programName}
                                item={item}
                            />
                        )}
                    />
                </View>
            )
        }

        private renderMetaHeader(item: EpisodeType) {
            const { themeContext } = this.props

            return (
                <View>
                    <View style={styles.meta}>
                        <View style={{ flex: 1 }}>
                            <Title color={themeContext.theme.colors.TextColor} numberOfLines={2} >{item.title}</Title>
                        </View>
                        <TouchableHighlight onPress={this.handleShare}>
                            <View style={styles.shareButton}>
                                <Icon
                                    name={getIcon('share')}
                                    color={this.props.themeContext.theme.colors.ButtonColor}
                                    size={25}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.labelWrapper}>
                        <SubTitle color={themeContext.theme.colors.SubTitleColor}>{format(item.date, 'DD-MM-YYYY')}</SubTitle>
                        <Label
                            color={themeContext.theme.colors.LabelColor}
                            textColor={themeContext.theme.colors.LabelTextColor}
                            text={item.programName}
                        />
                    </View>
                    <Paragraph color={themeContext.theme.colors.TextColor}>{item.description}</Paragraph>
                </View>
            )
        }

        private handleLayoutChange = () => {
            this.setState({ height: Dimensions.get('window').height })
        }

        private handleShare = () => {
            Share.open(this.getShareOptions())
        }

        private handleFullScreenToggle = () => {
            const { fullScreen } = this.state
            this.setState({ fullScreen: !fullScreen })
        }

        private getShareOptions = () => {
            const item = this.props.navigation.getParam('item')

            return {
                title: item.title,
                message: `Kijk naar deze video van ${item.programName}`,
                url: item.streams.mp4,
                subject: `Kijk naar deze video van ${item.programName}` //  for email
            }
        }

        private getRelevantVideosFromEpisode() {
            const data = this.props.navigation.getParam('data')
            const item = this.props.navigation.getParam('item')

            return data.filter(i => {

                return i.programName === item.programName && i.id !== item.id

            })

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        paddingHorizontal: 12,
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    videoContainer: {
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    loader: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    meta: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    shareButton: {
        marginLeft: 12,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
