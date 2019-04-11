import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StyleProp,
    TouchableHighlight,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export interface Props {
    style?: StyleProp<{}>,
    item: any
    onPress?: (item: any) => void
}

export interface State {

}

export class OnDemandVideoItem extends React.Component<Props, State> {
    public render() {
        return (
            <TouchableHighlight onPress={this.handleOnPress}>
                <View style={this.getStyles()}>
                    <Image style={{ width: '100%', height: 220 }} source={{ uri: this.props.item.poster }}/>
                    <Text>{this.props.item.programName}</Text>
                    <Text>{this.props.item.title}</Text>
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
})
