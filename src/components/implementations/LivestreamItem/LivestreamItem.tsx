import * as React from 'react'
import {
    View,
    Image,
    StyleSheet,
    StyleProp,
    TouchableHighlight,
    ImageSourcePropType,
} from 'react-native'
import { LiveIndicator } from 'src/components/core/LiveIndicator/LiveIndicator'
import { getIcon } from 'src/utils/icons'
import Icon from 'react-native-vector-icons/Ionicons'
import { Title } from 'src/components/core/Typography/Title'
import { ThemeType } from 'src/services/theme';
import { AnalyticsData } from 'src/services/Analytics';

export interface Props {
    style?: StyleProp<{}>,
    title?: string
    thumbnail?: ImageSourcePropType
    onPress?: () => void
    theme: ThemeType
}

export interface State {
    loading: boolean
}

export class LivestreamItem extends React.Component<Props, State> {

    public state: State = {
        loading: true,
    }

    public render() {
        const { thumbnail, title, theme } = this.props

        return (
            <View style={this.getStyles()}>
                <TouchableHighlight onPress={this.handleOnPress}>
                    <View style={this.getThumbnailStyles()}>
                        {thumbnail && (
                            <Image
                                style={styles.item}
                                source={thumbnail}
                                onLoadEnd={() => this.setState({ loading: false })}
                            />
                        )}
                        <View style={styles.cover} />
                        <Icon
                            name={getIcon('play-circle')}
                            color={theme.colors.playButtonColor}
                            size={60}
                            style={styles.playButton}
                        />
                        <LiveIndicator
                            color={theme.colors.RadioPlayerBackgroundColor}
                            textColor={theme.colors.LiveIndicatorTextColor}
                            style={styles.liveIndicator}
                        />
                    </View>
                    <Title color={theme.colors.TextColor} textStyle={this.getTitleStyles()}>{title}</Title>
                </TouchableHighlight >
            </View>
        )
    }

    private handleOnPress = () => {
        const { onPress } = this.props

        if (onPress) {
            AnalyticsData.trackLivesteamClickEvent({})
            onPress()
        }
    }

    private getTitleStyles() {
        const { TextColor } = this.props.theme.colors

        return [
            styles.title,
            { color: TextColor },
        ]
    }

    private getThumbnailStyles() {
        const { VideoBackgroundColor } = this.props.theme.colors

        return [
            styles.thumbnail,
            { backgroundColor: VideoBackgroundColor },
        ]
    }

    private getStyles() {
        const { style } = this.props

        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {

    },
    thumbnail: {
        backgroundColor: '#000',
        width: '100%',
        height: 186,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    playButton: {

    },
    liveIndicator: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    item: {
        position: 'absolute',
        width: '100%',
        height: 220,
    },
    title: {
        marginVertical: 12,
    },
    cover: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.4,
    }
})
