import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { namespaceLocalize } from 'src/services/LocalizationService'
import { Title } from 'src/BP/Components/Typography/Title'
import { Page } from 'src/BP/Components/Page/Page'
import { Icon } from 'src/BP/Components/Icons/Icon'
import { IconType } from 'src/utils/icons'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}

export class IconsView extends React.Component<Props, State> {

    private loc = namespaceLocalize(t => t.KitchenSink.Components.Icons)

    public render() {
        return (
            <Page>

                <Title>{this.loc(t => t.Title)}</Title>
                <View style={styles.display}>
                    <Icon
                        type={IconType.emptyState.empty}
                    />
                    <Icon
                        type={IconType.emptyState.empty}
                        color={'yellow'}
                    />
                    <Icon
                        type={IconType.emptyState.empty}
                        color={'red'}
                    />
                    <Icon
                        type={IconType.emptyState.empty}
                        color={'blue'}
                    />
                </View>
            </Page>
        )
    }
}

const styles = StyleSheet.create({
    display: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})
