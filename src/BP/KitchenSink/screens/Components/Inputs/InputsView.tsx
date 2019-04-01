import React from 'react'
import {
    StyleProp,
    Image,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { namespaceLocalize } from 'src/services/LocalizationService'
import { Title } from 'src/BP/Components/Typography/Title'
import { Paragraph } from 'src/BP/Components/Typography/Paragraph'
import { FormInput } from 'src/BP/Components/FormInput/FormInput'
import { Page } from 'src/BP/Components/Page/Page'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}

export class InputsView extends React.Component<Props, State> {

    private loc = namespaceLocalize(t => t.KitchenSink.Components.Inputs)

    public render() {
        return (
            <Page>
                <Title>{this.loc(t => t.Title)}</Title>
                <FormInput
                    placeholder={'my nice input'}
                />

                <Title>{this.loc(t => t.States.Title)}</Title>

                <Paragraph>
                    {this.loc(t => t.States.disabled)}
                </Paragraph>
                <FormInput
                    isDisabled={true}
                    placeholder={'my nice input'}
                />

                <Paragraph>
                {this.loc(t => t.States.Title)}
                </Paragraph>
                <FormInput
                    placeholder={'my nice input'}
                    showError={true}
                />
                <FormInput
                    placeholder={'my nice input'}
                    showWarning={true}
                />
                <FormInput
                    placeholder={'my nice input'}
                    showSuccess={true}
                />

                <Paragraph>
                    {this.loc(t => t.States.textFeedback)}
                </Paragraph>
                <FormInput
                    placeholder={'my nice input'}
                    showSuccess={'lengte is voldoende'}
                />

                <Title>{this.loc(t => t.Extra.Title)}</Title>
                    <Paragraph>
                        {this.loc(t => t.Extra.rightComponent)}
                    </Paragraph>
                <FormInput
                    placeholder={'my nice input'}
                    rightComponent={
                        <Image
                            style={{ width: 12, height: 12, marginRight: 12 }}
                            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                        />
                    }
                />
            </Page >
        )
    }
}
