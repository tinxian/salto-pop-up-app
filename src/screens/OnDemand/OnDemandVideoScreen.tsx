import * as React from 'react'
import { View, StyleSheet, StyleProp, Button, ActivityIndicator, Text, StatusBar } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Video from 'react-native-video'
import Share from 'react-native-share';
import { EpisodeType } from 'src/services/videos';
import { Title } from 'src/components/Typography/Title';
interface Params {
    item: EpisodeType,
}

interface Props extends NavigationScreenProps<Params> {
    style: StyleProp<{}>,
    uri?: string,
}

interface State {
    loading: boolean
}

export class OnDemandVideoScreen extends React.Component<Props, State> {
    public state: State = {
        loading: true,
    }

    // public static navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => ({
    //     drawerLockMode: 'locked-closed',
    //     gesturesEnabled: true,
    //     gestureResponseDistance: { horizontal: '100%', vertical: '100%' },


    // })

    public componentDidMount() {
        StatusBar.setHidden(true, 'fade')
    }

    public componentWillUnmount() {
        StatusBar.setHidden(false, 'fade')
    }

    public render() {
        const { loading } = this.state
        const item = this.props.navigation.getParam('item')
        return (
            <View style={this.getStyles()}>
                <StatusBar hidden={true} animated={true} />
                <View style={styles.videoContainer}>
                    {loading && (
                        <View style={styles.loader}>
                            <ActivityIndicator />
                        </View>
                    )}
                    <Video
                        style={{ flex: 1 }}
                        controls={true}

                        onLoad={() => this.setState({ loading: false })}
                        source={{ uri: item.streams.mp4 }}
                    />
                </View>

                <Title numberOfLines={2} >{item.title}</Title>
                <View style={styles.actions}>
                    <Button title="share" onPress={() => Share.open(this.getShareOptions())} />
                    <Button title="Back" onPress={() => this.props.navigation.goBack()} />
                </View>
                <Text>{item.description}</Text>
            </View>
        )
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
        backgroundColor: 'white',
    },
    videoContainer: {
        backgroundColor: '#000',
        height: 300,
        width: '100%',
    },
    loader: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
})
