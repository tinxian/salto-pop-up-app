import React from 'react'
import {
    StyleProp,
    ImageSourcePropType,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Title } from 'src/BP/Components/Typography/Title'
import { Page } from 'src/BP/Components/Page/Page'
import { Toggle } from 'src/BP/Components/Toggle/Toggle'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}
// tslint:disable:jsx-use-translation-function
export interface SlideShowDataType {
    title: String,
    caption: String,
    source: ImageSourcePropType
}

export class ToggleView extends React.Component<Props, State> {

    public render() {
        return (
            <React.Fragment>
                <Page>
                    <Title>Switch</Title>
                    <Toggle

                    />
                </Page>
            </React.Fragment>
        )
    }
}
