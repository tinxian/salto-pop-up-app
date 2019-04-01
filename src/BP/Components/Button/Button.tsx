import React from 'react'
import { TouchableHighlightProps, View, StyleSheet, StyleProp, Text, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import { colors, ButtonColors } from 'src/utils/colors'

interface Props extends TouchableHighlightProps {
    style?: StyleProp<{}>
    active?: boolean
    disabled?: boolean
    loading?: boolean
    isFlat?: boolean
    isGhost?: boolean
}

interface State {
    pressed: boolean
}

interface ButtonConfig {
    background: ButtonColors
    backgroundPressed: ButtonColors
    text: ButtonColors
}

const buttonColorConfig: {[key: string]: ButtonConfig} = {
    default: {
        background: colors.buttons.default,
        backgroundPressed: colors.buttons.defaultPressed,
        text: colors.buttons.defaultText,
    },
    active: {
        background: colors.buttons.active,
        backgroundPressed: colors.buttons.activePressed,
        text: colors.buttons.activeText,
    },
    disabled: {
        background: colors.buttons.disabled,
        backgroundPressed: colors.buttons.disabledPressed,
        text: colors.buttons.disabledText,
    },
}

export class Button extends React.Component<Props, State> {

    public state: State = {
        pressed: false,
    }

    public render() {
        const {
            children,
            active,
            disabled,
            style,
            loading,
            isGhost,
            isFlat,
            ...restProps
        } = this.props

        return (
            <TouchableWithoutFeedback
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                {...restProps}
                {...this.getOverrideProps()}
            >
                <View style={this.getStyles(active, disabled)}>
                    {loading ? (
                        <ActivityIndicator color={this.getActivityIndicatorColor()} />
                    ) : (
                        <Text
                            style={[
                                { color: buttonColorConfig.default.text },
                                active && { color: buttonColorConfig.active.text },
                                disabled && { color: buttonColorConfig.disabled.text },
                                isGhost && { color: this.getBackgroundColor() },
                                isFlat && { color: this.getBackgroundColor() },
                            ]}
                        >
                            {children}
                        </Text>
                    ) }
                </View>
            </TouchableWithoutFeedback>
        )
    }

    private handlePressIn = () => {
        this.setState({ pressed: true })
    }

    private handlePressOut = () => {
        this.setState({ pressed: false })
    }

    private defaultPressed() {
        const { disabled, active } = this.props
        const { pressed } = this.state

        return pressed && !active && !disabled
    }

    private activePressed() {
        const { active } = this.props
        const { pressed } = this.state

        return pressed && active
    }

    private getOverrideProps() {
        const { disabled } = this.props
        const overrideProps: Partial<Props> = {}

        if (disabled) {
            overrideProps.onPress = undefined
        }

        return overrideProps
    }

    private getPressedBackgroundColor() {
        const { isGhost, isFlat } = this.props
        if (isGhost || isFlat) {
            if (!this.activePressed() && !this.defaultPressed()) {
                return undefined
            }
            return colors.buttons.pressed
        }
        if (this.defaultPressed()) {
            return buttonColorConfig.default.backgroundPressed
        }

        if (this.activePressed()) {
            return buttonColorConfig.active.backgroundPressed
        }

        return buttonColorConfig.disabled.backgroundPressed
    }

    private getBackgroundColor() {
        const { disabled, active, isGhost, isFlat } = this.props

        if (disabled) {
            return buttonColorConfig.disabled.background
        }
        if (active) {
            return buttonColorConfig.active.background
        }

        if (isGhost || isFlat) {
            return buttonColorConfig.default.text
        }

        return buttonColorConfig.default.background

    }

    private getActivityIndicatorColor() {
        const { disabled, active, isGhost, isFlat } = this.props
        if (isGhost || isFlat) {
            return this.getBackgroundColor()
        }
        if (disabled) {
            return buttonColorConfig.disabled.text
        }
        if (active) {
            return buttonColorConfig.active.text
        }
        return buttonColorConfig.default.text
    }

    private getStyles(active?: boolean, disabled?: boolean): StyleProp<{}> {
        const { style, isGhost, isFlat } = this.props
        const { pressed } = this.state

        return [
            styles.buttonDefault,
            { backgroundColor: this.getBackgroundColor() },
            isGhost && [ styles.isGhost, {
                borderColor: this.getBackgroundColor(),
                color: this.getBackgroundColor(),
            } ],
            isFlat && styles.isFlat,
            pressed && { backgroundColor: this.getPressedBackgroundColor() },
            style,
        ]
    }
}

const styles = StyleSheet.create({
    buttonDefault: {
        backgroundColor: buttonColorConfig.default.background,
        padding: 16,
        paddingHorizontal: 24,
        borderRadius: 5,
        fontWeight: '800',
    },
    buttonActive: {
        backgroundColor: buttonColorConfig.active.background,
    },
    buttonDisabled: {
        backgroundColor: buttonColorConfig.disabled.background,
    },
    isGhost: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    isFlat: {
        backgroundColor: 'white',
        borderRadius: 0,
    },
})
