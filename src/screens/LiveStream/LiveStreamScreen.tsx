import * as React from 'react'
import { View, StyleSheet, StyleProp, Button, Image, ScrollView } from 'react-native'
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
    style: StyleProp<{}>
}

interface State {

}

export class HomeScreen extends React.Component<Props, State> {
    public render() {
        return (
            <View style={this.getStyles()}>
                <Image
                    style={styles.background}
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT64sLpyaGTic1h0Vu8qMSBA6BNXyR6zxqd4xh-4FUcl99kt4hk' }}
                />
                <View style={styles.wrapper} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: 100, flex: 1 }} />
                        <View style={styles.content}>
                            <Button title="open livestream" onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')} />
                        </View>
                    </ScrollView>
                </View>

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
    background: {
        width: '100%',
        height: '100%',
    },
    wrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    content: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
})
