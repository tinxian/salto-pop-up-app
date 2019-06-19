import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ThemeType } from 'src/services/theme';
import { getIcon } from 'src/utils/icons';
import { Title, TitleSizeType } from '../Typography/Title';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    renderContent?: () => JSX.Element
    title: string
    titleSize: TitleSizeType
    theme: ThemeType
}

interface State {
    expand: boolean
}
export class ExpandableTitleContainer extends React.Component<Props, State> {

    public state: State = {
        expand: false,
    }

    public render() {
        const { theme, title, titleSize } = this.props
        const { expand } = this.state

        return (
            <View>
                <TouchableOpacity onPress={this.handleExpandToggle}>
                    <View
                        style={styles.titleContainer}
                    >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Title
                                size={titleSize}
                                color={theme.colors.TextColor}
                                numberOfLines={!expand ? 2 : undefined}
                            >
                                {title}
                            </Title>
                        </View>
                        <View>
                            <View style={styles.arrowContainer}>
                                <Icon
                                    name={getIcon('arrow-down')}
                                    color={theme.colors.ButtonColor}
                                    size={25}
                                    style={{ transform: [{ rotate: expand ? '180deg' : '0deg' }] }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {this.renderContent()}
            </View>
        )
    }

    private handleExpandToggle = () => {
        const { expand } = this.state
        this.setState({ expand: !expand })
    }

    private renderContent() {
        const { renderContent } = this.props
        const { expand } = this.state

        if (!expand || !renderContent) {
            return null
        }

        return renderContent()
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    arrowContainer: {
        marginLeft: 12,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
})