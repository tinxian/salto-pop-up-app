import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  StyleProp,
} from 'react-native'

interface Props {
    label?: string
    onColor?: string
    offColor?: string
    size?: string
    labelStyle?: StyleProp<{}>
    onToggle?: (state: boolean) => void
    icon?: any
}

interface State {
    active: boolean
}

export class Toggle extends React.Component<Props, State> {

    public static defaultProps = {
        isOn : false,
        onColor: '#634fc9',
        offColor: '#ecf0f1',
        size: 'medium',
        labelStyle: {},
        icon: null,
    }

    public state: State = {
        active: false,
    }

    public offsetX = new Animated.Value(0)

    public createToggleSwitchStyle = () => ({
        justifyContent: 'center',
        width: 60,
        borderRadius: 20,
        padding: 12,
        backgroundColor: (this.state.active) ? this.props.onColor : this.props.offColor,
    } as any)

    public createInsideCircleStyle = () => ({
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        position: 'absolute',
        backgroundColor: 'white',
        transform: [{ translateX: this.offsetX }],
        width: 18,
        height: 18,
        borderRadius: (18 / 2),
    })

    public render() {
        const toValue = this.state.active ? 60 - 26 : 0

        Animated.spring(this.offsetX, {
            toValue,
            useNativeDriver: true,
        }).start()

        return (
            <View style={styles.container}>
                {(this.props.label)
                ? <Text style={[ styles.labelStyle, this.props.labelStyle ]}>{this.props.label}</Text>
                : null
                }
                <TouchableOpacity
                    style={this.createToggleSwitchStyle()}
                    activeOpacity={0.8}
                    onPress={this.handleToggle}
                >
                <Animated.View style={this.createInsideCircleStyle()} >{this.props.icon}</Animated.View>
                </TouchableOpacity>
            </View>
        )
    }

    private handleToggle = () => {
        const { onToggle } = this.props

        this.setState({ active: !this.state.active })

        if (onToggle) {
            onToggle(!this.state.active)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelStyle: {
        marginHorizontal: 10,
    },
})
