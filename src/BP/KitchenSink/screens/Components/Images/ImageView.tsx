import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Title } from 'src/BP/Components/Typography/Title'
import { Page } from 'src/BP/Components/Page/Page'
import { Picture } from 'src/BP/Components/Images/Image'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}
// tslint:disable:jsx-use-translation-function
export class ImageView extends React.Component<Props, State> {

    public render() {
        return (
            <Page>

                <Title>Images</Title>
                <View style={styles.display}>
                    <Picture
                        style={{ width: '100%', height: 200 }}
                        source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                    />
                    <Picture
                        style={{ width: '100%', height: 200 }}
                        source={{ uri: 'my failed image.png' }}
                    />
                </View>
            </Page>
        )
    }
}

const styles = StyleSheet.create({
    display: {
        paddingHorizontal: 16,
    },
})
