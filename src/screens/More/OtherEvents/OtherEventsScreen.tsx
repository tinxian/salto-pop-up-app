import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { getIcon } from 'src/utils/icons'
import { NavigationScreenProps } from 'react-navigation'
import { Title } from 'src/components/core/Typography/Title'
import Icon from 'react-native-vector-icons/Ionicons'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider'

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {

}

interface OtherEventItem {
    title: string
    subtitle: string
    logo: string
    link?: string
}

const OtherEventItems: OtherEventItem[] = [
    { title: 'ADE x SALTO', subtitle: 'Tijdlijn, nieuws en live ', logo: 'https://www.xlr8r.com/.image/t_share/MTU1MzE4ODM2MDI0ODQ1NTAw/amsterdam-dance-event-ade-logo.jpg' },
    { title: 'SALTO x SALTO', subtitle: 'Nieuws, nieuws en nieuws ', logo: 'https://www.xlr8r.com/.image/t_share/MTU1MzE4ODM2MDI0ODQ1NTAw/amsterdam-dance-event-ade-logo.jpg' },
]

export const OtherEventsScreen = withThemeContext(
    class OtherEventsScreen extends React.Component<Props & ThemeInjectedProps, State> {

        public render() {
            const { colors } = this.props.themeContext.theme
            return (
                <View style={this.getStyles()}>

                    <FlatList<OtherEventItem>
                        ListHeaderComponent={() => (
                            <>
                                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                    <Icon name={getIcon('close')} size={50} />
                                </TouchableOpacity>
                                <View style={styles.titleContainer}>
                                    <Title color={colors.TextColor}>Andere evenementen</Title>
                                </View>
                            </>
                        )}
                        contentContainerStyle={this.getWrapperStyles()}
                        data={OtherEventItems}
                        renderItem={item => this.renderItem(item.item)}
                        keyExtractor={item => item.title}
                    />
                </View>
            )
        }

        private renderItem(item: OtherEventItem) {
            return (
                <View style={styles.itemContainer}>
                    <Image
                        style={styles.itemLogo}
                        source={{ uri: item.logo }}
                    />
                    <View style={styles.labelContainer}>
                        <Text style={this.getTitleStyles()}>
                            {item.title}
                        </Text>
                        <Text style={this.getSubtitleStyles()}>
                            {item.subtitle}
                        </Text>
                    </View>
                </View>
            )
        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme.colors
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
            ]
        }

        private getTitleStyles() {
            const { TextColor } = this.props.themeContext.theme.colors
            return [
                { color: TextColor },
                styles.label,
            ]
        }

        private getSubtitleStyles() {
            const { TextColor } = this.props.themeContext.theme.colors
            return [
                { color: TextColor },
                styles.subtitle,
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
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',

    },
    labelContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 10,
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
    itemLogo: {
        width: 80,
        height: 80,
    },
    content: {
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 22,
        borderRadius: 25,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
