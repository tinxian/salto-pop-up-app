import React from 'react'
import {
    View,
    StyleSheet,
    StyleProp,

} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { namespaceLocalize } from 'src/services/LocalizationService'
import { Button } from 'src/BP/Components/Button/Button'
import { Title } from 'src/BP/Components/Typography/Title'
import { Paragraph } from 'src/BP/Components/Typography/Paragraph'
import { Page } from 'src/BP/Components/Page/Page'

interface Props extends NavigationScreenProps {
    style?: StyleProp<{}>
}

interface State {}

export class ButtonsView extends React.Component<Props, State> {

    private loc = namespaceLocalize(t => t.KitchenSink.Components.Buttons)

    public render() {
        return (
            <Page>
                <Title>{this.loc(t => t.Default.title)}</Title>
                <View style={{ paddingHorizontal: 12 }}>
                    <Paragraph>
                        {this.loc(t => t.explenations.Default)}
                    </Paragraph>
                    <Paragraph>
                        {this.loc(t => t.explenations.Disabled)}
                    </Paragraph>
                    <Paragraph>
                        {this.loc(t => t.explenations.Active)}
                    </Paragraph>
                    <Paragraph>
                        {this.loc(t => t.explenations.Loading)}
                    </Paragraph>
                </View>

                <View style={styles.display}>
                    <Button>
                        {this.loc(t => t.Default.Default)}
                    </Button>
                    <Button
                        disabled={true}
                    >
                        {this.loc(t => t.Default.Disabled)}
                    </Button>
                    <Button
                        active={true}
                    >
                        {this.loc(t => t.Default.Active)}
                    </Button>
                    <Button
                        active={true}
                        loading={true}
                    >
                        {this.loc(t => t.Default.Loading)}
                    </Button>
                </View>

                <Title>{this.loc(t => t.Ghost.title)}</Title>
                <View style={styles.display}>
                    <Button
                        isGhost={true}
                    >
                        {this.loc(t => t.Ghost.Default)}
                    </Button>
                    <Button
                        isGhost={true}
                        disabled={true}
                    >
                        {this.loc(t => t.Ghost.Disabled)}
                    </Button>
                    <Button
                        isGhost={true}
                        active={true}
                    >
                        {this.loc(t => t.Ghost.Active)}
                    </Button>
                    <Button
                        isGhost={true}
                        active={true}
                        loading={true}
                    >
                        {this.loc(t => t.Ghost.Loading)}
                    </Button>
                </View>

                <Title>{this.loc(t => t.Flat.title)}</Title>
                <View style={styles.display}>
                    <Button
                        isFlat={true}
                    >
                        {this.loc(t => t.Flat.Default)}
                    </Button>
                    <Button
                        isFlat={true}
                        disabled={true}
                    >
                        {this.loc(t => t.Flat.Disabled)}
                    </Button>
                    <Button
                        isFlat={true}
                        active={true}
                    >
                        {this.loc(t => t.Flat.Active)}
                    </Button>
                    <Button
                        isFlat={true}
                        active={true}
                        loading={true}
                    >
                        {this.loc(t => t.Flat.Loading)}
                    </Button>

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
        flexWrap: 'wrap',
    },
})
