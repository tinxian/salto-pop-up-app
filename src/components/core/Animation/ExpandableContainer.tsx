import * as React from 'react'
import { StyleProp, Animated } from 'react-native'


interface Props {
    style?: StyleProp<{}>,
    startHeight: number
    maxHeight: number
    expand: boolean
}

interface State {
    heightAnim: Animated.Value
}

const ANIMATION_DURATION = 300

export class ExpandableContainer extends React.Component<Props, State> {
    public state: State = {
        heightAnim: new Animated.Value(0),
    }

    public componentDidUpdate(prevProps: Props) {
        if (this.props.expand !== prevProps.expand) {
            if (this.props.expand === true) {
                this.animateIn()
            } else {
                this.animateOut()
            }
        }
    }

    public render() {
        const { children } = this.props
        return (
            <Animated.View style={this.getStyles()}>
                {children}
            </Animated.View>
        )
    }

    private animateIn() {
        const { heightAnim } = this.state
        Animated.timing(
            heightAnim,
            {
                toValue: 1,
                duration: ANIMATION_DURATION,
            }
        ).start()
    }

    private animateOut() {
        const { heightAnim } = this.state
        Animated.timing(
            heightAnim,
            {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }
        ).start()
    }

    private getStyles() {
        const { style, startHeight, maxHeight } = this.props
        const { heightAnim } = this.state

        const interpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [startHeight, maxHeight],
        })

        return [
            {
                height: interpolation,
            },
            style,
        ]
    }
}
