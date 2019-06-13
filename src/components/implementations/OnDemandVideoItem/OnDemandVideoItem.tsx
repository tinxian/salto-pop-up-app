import { format } from 'date-fns';
import * as React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SubTitle } from 'src/components/core/Typography/SubTitle';
import { Title, TitleSizeType } from 'src/components/core/Typography/Title';
import { AnalyticsData } from 'src/services/Analytics';
import { ThemeType } from 'src/services/theme';
import { EpisodeType } from 'src/services/videos';
import { getMillisecondsInMinutes } from 'src/utils/date';
import { getIcon } from 'src/utils/icons';

export interface Props {
    style?: StyleProp<{}>,
    item?: EpisodeType
    theme: ThemeType
    poster: ImageSourcePropType
    title?: string
    programName?: string
    onPress?: (item?: EpisodeType) => void
}

export interface State {
    loading: boolean
}

export class OnDemandVideoItem extends React.Component<Props, State> {

    public state: State = {
        loading: true,
    }

    public render() {
        const { poster, title, item, theme } = this.props
        const { SubTitleColor } = this.props.theme.colors

        return (
            <View style={this.getStyles()}>

                <TouchableOpacity onPress={this.handleOnPress}>
                    <React.Fragment>
                        <View style={styles.thumbnail}>
                            {poster && (
                                <Image
                                    style={styles.item}
                                    source={poster}
                                    onLoadEnd={() => this.setState({ loading: false })}
                                />
                            )}
                            <View style={styles.cover} />
                            <Icon
                                name={getIcon('play-circle')}
                                color={'#ffffff'}
                                size={60}
                                style={styles.playButton}
                            />
                            {item && (
                                <View style={styles.durationContainer}>
                                    <Text style={styles.durationText}>{getMillisecondsInMinutes(item.duration)}</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Title
                                color={theme.colors.TextColor}
                                numberOfLines={2}
                                textStyle={this.getTitleStyles()}
                                size={TitleSizeType.small}
                            >
                                {title}
                            </Title>
                        </View>
                        {item && (
                            <View style={styles.metaContainer}>
                                <SubTitle color={SubTitleColor}>{format(item.date, 'DD-MM-YYYY')} - {item.programName}</SubTitle>
                            </View>
                        )}
                    </React.Fragment>
                </TouchableOpacity >
            </View>
        )
    }

    private handleOnPress = () => {
        const { onPress, item } = this.props

        if (onPress && item) {
            AnalyticsData.trackOndemandVideoClickEvent({
                title: item.title,
                videoDuration: getMillisecondsInMinutes(item.duration),
                url: item.streams.mp4,
                id: item.id,
            })
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
        flexWrap: 'wrap',
        flex: 1,
    },
    metaContainer: {
        marginBottom: 18,

        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descriptionContainer: {
        marginTop: 12,
        marginBottom: 8,
        width: '100%',
    },
    label: {
        marginLeft: 12,
        maxWidth: 120,
    },
    durationContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#000000',
        borderRadius: 3,
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    durationText: {
        color: '#ffffff'
    },
    cover: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.4,
    }
})

