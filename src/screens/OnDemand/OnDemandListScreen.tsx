import * as React from 'react'
import { View, StyleSheet, StyleProp, FlatList, ActivityIndicator } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { OnDemandVideoItem } from 'src/components/OnDemandVideoItem/OnDemandVideoItem'
import { Videos, EpisodeType } from 'src/services/videos';

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {
    loading: boolean,
    data: EpisodeType[]
}

export class OnDemandListScreen extends React.Component<Props, State> {
    public state: State = {
        loading: true,
        data: [],
    }

    public async componentDidMount() {
        const episodes = await Videos.getAllVideos()

        this.setState({
            data: episodes,
            loading: false,
        })
    }

    public render() {
        const { data, loading } = this.state

        if (loading) {
            return <ActivityIndicator />
        }

        return (
            <View style={this.getStyles()}>
                <FlatList
                    data={data}
                    keyExtractor={item => {
                        return item.id
                    }}
                    renderItem={({ item }) => (
                        <OnDemandVideoItem
                            onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { uri: item.streams.mp4 })}
                            item={item}
                        />
                    )}
                />
            </View>
        )
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
        flex: 1,
    },
})
