import * as React from 'react'
import {
    View,
    Image,
    StyleSheet,
    StyleProp,
    TouchableHighlight,
    ImageSourcePropType,
    Text,
} from 'react-native'
import { getIcon } from 'src/utils/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Title } from 'src/components/core/Typography/Title';
import { EpisodeType } from 'src/services/videos';
import { Label } from 'src/components/core/Label/Label';
import { ThemeType } from 'src/providers/ThemeProvider';
import { getMillisecondsInMinutes } from 'src/utils/date';

export interface Props {
    style?: StyleProp<{}>,
    item?: EpisodeType
    theme: ThemeType
    poster: ImageSourcePropType
    title: string
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
        const { poster, title, item } = this.props
        const { LabelColor } = this.props.theme

        return (
            <View style={this.getStyles()}>

                <TouchableHighlight onPress={this.handleOnPress}>

                    <View style={styles.thumbnail}>
                        {poster && (
                            <Image
                                style={styles.item}
                                source={poster}
                                onLoadEnd={() => this.setState({ loading: false })}
                            />
                        )}
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
                </TouchableHighlight >
                <View style={styles.metaContainer}>
                    <Title numberOfLines={2} textStyle={this.getTitleStyles()}>{title}</Title>
                    {item && <Label style={styles.label} color={LabelColor} text={item.programName} />}
                </View>
            </View>
        )
    }

    private handleOnPress = () => {
        const { onPress } = this.props

        if (onPress) {
            onPress()
        }
    }

    private getTitleStyles() {
        const { TextColor } = this.props.theme

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
        marginVertical: 12,
    },
    metaContainer: {
        height: 50,
        marginBottom: 12,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        marginLeft: 12,
        maxWidth: 120,
    },
    durationContainer: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#000000',
        borderRadius: 3,
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    durationText: {
        color: '#ffffff'
    }
})

