import React from 'react'
import {
    StyleProp, View, Text
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { namespaceLocalize } from 'src/services/LocalizationService'
import { Title } from 'src/BP/Components/Typography/Title'
import { Page } from 'src/BP/Components/Page/Page'
import { RepeatingBackgroundView } from 'src/BP/Components/Background/RepeatingBackgroundView'
import { Paragraph } from 'src/BP/Components/Typography/Paragraph'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}

export class BackgroundsView extends React.Component<Props, State> {

    private loc = namespaceLocalize(t => t.KitchenSink.Components.Background)

    // tslint:disable:jsx-use-translation-function
    public render() {
        return (
            <Page>
                <Title>{this.loc(t => t.Title)}</Title>
                <Paragraph>
                    for repeating patterns you can use the RepeatingBackgroundView that acts like a normal view.
                </Paragraph>
                <Paragraph>
                    with children
                </Paragraph>
                <RepeatingBackgroundView
                    style={{ width: 100, height: 100, backgroundColor: 'green' }}
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                />

                <Paragraph>
                    with children
                </Paragraph>
                <RepeatingBackgroundView
                    style={{ width: 100, height: 100, padding: 10 }}
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                >
                    <View style={{ backgroundColor: 'red' }}>
                        <Text>child</Text>
                    </View>
                </RepeatingBackgroundView>
            </Page >
        )
    }
}
