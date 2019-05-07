import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StyleProp,
    TouchableHighlight,
    ImageSourcePropType,
} from 'react-native'
import { LiveIndicator } from 'src/components/core/LiveIndicator/LiveIndicator';
import { getIcon } from 'src/utils/icons';
import Icon from 'react-native-vector-icons/Ionicons';
export interface Props {
    style?: StyleProp<{}>,
    thumbnail?: ImageSourcePropType
    onPress?: () => void
}

export interface State {
    loading: boolean
}

export class LivestreamItem extends React.Component<Props, State> {

    public state: State = {
        loading: true,
    }

    public render() {
        const { thumbnail } = this.props

        return (
            <TouchableHighlight onPress={this.handleOnPress}>
                <View style={this.getStyles()}>
                    {thumbnail && (
                        <Image
                            style={styles.item}
                            source={thumbnail}
                            onLoadEnd={() => this.setState({ loading: false })}
                        />
                    )}
                    <Icon
                        name={getIcon('play-circle')}
                        color={'#ffffff'}
                        size={60}
                        style={styles.playButton}
                    />
                    <LiveIndicator style={styles.liveIndicator} />
                </View>
            </TouchableHighlight >
        )
    }

    private handleOnPress = () => {
        const { onPress } = this.props

        if (onPress) {
            onPress()
        }
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
    }
})
