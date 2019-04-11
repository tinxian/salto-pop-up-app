import * as React from 'react'
import { View, Text, StyleSheet, StyleProp, FlatList, Button, ActivityIndicator } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import axios from 'axios'
import { OnDemandVideoItem } from 'src/components/OnDemandVideoItem/OnDemandVideoItem'

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {
    loading: boolean,
    data: any[]
}

export class OnDemandList extends React.Component<Props, State> {
    public state: State = {
        loading: true,
        data: [],
    }

    public async componentDidMount() {

        await axios.get('https://vod.salto.nl/data/ondemand/pride')
        .then(response => {
            this.setState({
                data: response.data.episodes,
                loading: false,
            })
        })
        .catch(error => {
            // handle error
            console.log(error)
        })
    }

    public render() {
        const { data, loading } = this.state
        if (loading) {
            return <ActivityIndicator/>
        }
        return (
            <View style={this.getStyles()}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => {
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
    container:     {
        flex:    1,
    },
})
