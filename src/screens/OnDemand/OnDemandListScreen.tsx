import * as React from 'react'
import { View, StyleSheet, StyleProp, FlatList, ActivityIndicator, StatusBar, Image, Dimensions } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { OnDemandVideoItem } from 'src/components/implementations/OnDemandVideoItem/OnDemandVideoItem'
import { Videos, EpisodeType } from 'src/services/videos';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { Title } from 'src/components/core/Typography/Title';

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {
    loading: boolean,
    data: EpisodeType[]
}

export const OnDemandListScreen = withThemeContext(
    class OnDemandListScreen extends React.Component<Props & ThemeInjectedProps, State> {
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
            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={false} animated={false} />
                    <Image
                        style={styles.background}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT64sLpyaGTic1h0Vu8qMSBA6BNXyR6zxqd4xh-4FUcl99kt4hk' }}
                    />
                    <Image style={styles.logo} source={require("../../../../src/assets/images/logos/salto.png")} />
                    {this.renderList()}
                </View>
            )
        }

        private renderList() {
            const { theme } = this.props.themeContext
            const { data, loading } = this.state

            if (this.state.loading) {
                return (
                    <View
                        style={[
                            this.getWrapperStyles(),
                            { top: 100, paddingTop: 24 },
                        ]}
                    >
                        <ActivityIndicator />
                    </View>
                )
            }

            return (
                <FlatList
                    ListHeaderComponent={() => (
                        <View style={styles.titleContainer}>
                            <Title>Videos</Title>
                        </View>
                    )}
                    refreshing={loading}
                    contentContainerStyle={this.getWrapperStyles()}
                    contentInset={{ top: 100 }}
                    contentOffset={{ x: 0, y: -100 }}
                    data={data}
                    keyExtractor={item => {
                        return item.id
                    }}
                    renderItem={({ item }) => (
                        <OnDemandVideoItem
                            onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { item, data })}
                            poster={{ uri: item.poster }}
                            theme={theme}
                            title={item.title}
                            programName={item.programName}
                            item={item}
                        />
                    )}
                />
            )

        }
        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
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
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '50%',
    },
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    content: {
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 22,
        borderRadius: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
