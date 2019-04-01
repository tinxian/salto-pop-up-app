import React from 'react'
import { StyleSheet, StyleProp, TextInput, TextInputProps, View, Text } from 'react-native'
import { colors } from 'src/utils/colors'

interface Props extends TextInputProps {
    style?: StyleProp<{}>
    showError?: string | boolean
    showWarning?: string | boolean
    showSuccess?: string | boolean
    isDisabled?: boolean
    rightComponent?: JSX.Element
    inputStyle?: StyleProp<{}>
}

interface State {
    focused: boolean
}

const INPUT_HEIGT = 40

export class FormInput extends React.Component<Props, State> {

    public state: State = {
        focused: false,
    }

    public render() {
        const {
            showWarning,
            showSuccess,
            showError,
            isDisabled,
            rightComponent,
            style,
            inputStyle,
            ...restProps
        } = this.props

        return (
            <React.Fragment>
                <View style={this.getStyles()}>
                    <TextInput
                        style={[
                            styles.input,
                            this.getStateStyling(),
                            inputStyle,
                        ]}
                        onFocus={this.handleFocus}
                        onEndEditing={this.handleFocus}
                        onSubmitEditing={this.handleFocus}
                        autoCapitalize={'none'}
                        editable={!isDisabled}
                        {...restProps}
                    />
                    <View style={styles.rightComponentContainer}>
                        {rightComponent}
                    </View>
                </View>
                    {typeof showError === 'string' && (
                        <Text style={styles.errorText}>
                            {showError}
                        </Text>
                    )}
                    {typeof showWarning === 'string' && (
                        <Text style={styles.warningText}>
                            {showWarning}
                        </Text>
                    )}
                    {typeof showSuccess === 'string' && (
                        <Text style={styles.succesText}>
                            {showSuccess}
                        </Text>
                    )}

            </React.Fragment>
        )
    }
    private handleFocus = () => {
        const { focused } = this.state

        this.setState({
            focused: !focused,
        })
    }

    private getStateStyling() {
        const { showError, isDisabled, showWarning, showSuccess } = this.props

        if (showError) {
            return styles.error
        }

        if (isDisabled) {
            return styles.disabled
        }

        if (showWarning) {
            return styles.warning
        }

        if (!showError && !showWarning && showSuccess) {
            return styles.succes
        }

        if (this.state.focused) {
            return styles.focused
        }

        return styles.input
    }

    private getStyles() {
        const { style } = this.props

        return [
            styles.inputContainer,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: INPUT_HEIGT,
        borderRadius: 2,
        backgroundColor: colors.input.background,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.input.border,
        paddingHorizontal: 16,
        fontSize: 12,
        fontFamily: 'System',
    },
    disabled: {
        backgroundColor: colors.input.disabled,
    },
    error: {
        borderColor: colors.state.error,
    },
    focused: {
        borderColor: colors.input.focused,
    },
    warning: {
        borderColor: colors.state.warning,
    },
    succes: {
        borderColor: colors.state.success,
    },
    rightComponentContainer: {
        position: 'absolute',
        right: 0,
    },
    warningText: {
        fontSize: 12,
        fontFamily: 'System',
        lineHeight: 18,
        letterSpacing: 0.36,
        color:  colors.state.warning,
    },
    errorText: {
        fontSize: 12,
        fontFamily: 'System',
        lineHeight: 18,
        letterSpacing: 0.36,
        color:  colors.state.error,
    },
    succesText: {
        fontSize: 12,
        fontFamily: 'System',
        lineHeight: 18,
        letterSpacing: 0.36,
        color:  colors.state.success,
    },
})
