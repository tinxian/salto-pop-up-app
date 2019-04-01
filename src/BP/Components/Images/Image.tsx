import React from 'react'
import {
    StyleSheet,
    StyleProp,
    Image,
    View,
    ImageSourcePropType,
    NativeSyntheticEvent,
    ImageErrorEventData,
    Text,
    ImageProps,
    TouchableHighlight,
} from 'react-native'
import { IconType } from 'src/utils/icons'
import { Icon } from '../Icons/Icon'
import { colors } from 'src/utils/colors'

interface Props extends ImageProps {
    style?: StyleProp<{}>
    source: ImageSourcePropType
}

interface State {
    error: boolean
    empty: boolean
}

// tslint:disable:jsx-use-translation-function
export class Picture extends React.Component<Props, State> {

    public state: State = {
        error: false,
        empty: false,
    }

    public render() {
        const { source, ...restProps } = this.props
        const { error } = this.state

        if (error) {
            return (
                <TouchableHighlight
                    onPress={this.reset}
                    accessibilityLabel={'image not available'}
                    accessibilityHint={'tap to try again'}
                    accessibilityRole={'image'}
                >
                    <View
                        style={this.getStyles(styles.empty)}
                        accessible={true}

                    >
                        <View style={styles.inner}>
                            <Icon
                                type={IconType.emptyState.empty}
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyText}>
                                Image is not available
                            </Text>
                        </View>
                    </View>

                </TouchableHighlight>
            )
        }

        return (
            <Image
                {...restProps}
                onError={this.handleOnError}
                style={this.getStyles()}
                source={source}
                accessible={true}
                accessibilityIgnoresInvertColors={true}
                accessibilityRole={'image'}
            />
        )

    }

    public reset = () => {
        this.setState({ error: false, empty: false })
    }

    private handleOnError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        this.setState({ error: true })
    }

    private getStyles(extra?: StyleProp<{}>) {
        const { style } = this.props

        return [
            styles.image,
            extra,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: colors.background.gray,
    },
    empty: {
        backgroundColor: colors.background.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        alignItems: 'center',
    },
    emptyText: {
        color: colors.background.white,
    },
    emptyIcon: {
        tintColor: colors.background.white,
    },
})
