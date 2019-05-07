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
import { EpisodeType } from 'src/services/videos'

export interface Props {
    style?: StyleProp<{}>,
    item?: EpisodeType
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
        const { poster, title, programName } = this.props

        return (
            <TouchableHighlight onPress={this.handleOnPress}>
                <View style={this.getStyles()}>
                    <Image
                        style={styles.item}
                        source={poster}
                        onLoadEnd={() => this.setState({ loading: false })}
                    />
                    {programName && <Text>{programName}</Text>}
                    <Text>{title}</Text>
                </View>
            </TouchableHighlight >
        )
    }

    private handleOnPress = () => {
        const { onPress, item } = this.props

        if (onPress) {
            onPress(item)
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
        width: '100%',
        height: 300,
    },
    item: {
        width: '100%',
        height: 220,
    }
})
