import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StyleProp,
    TouchableHighlight,
} from 'react-native'
import { EpisodeType } from 'src/services/videos'

export interface Props {
    style?: StyleProp<{}>,
    item: EpisodeType
    onPress?: (item: EpisodeType) => void
}

export interface State {

}

export class OnDemandVideoItem extends React.Component<Props, State> {
    public render() {
        const { item } = this.props
        return (
            <TouchableHighlight onPress={this.handleOnPress}>
                <View style={this.getStyles()}>
                    <Image
                        style={styles.item}
                        source={{ uri: this.props.item.poster }}
                    />
                    <Text>{item.programName}</Text>
                    <Text>{item.title}</Text>
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
