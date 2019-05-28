import * as React from 'react'
import { StyleProp, Animated, StyleSheet, Dimensions } from 'react-native'
import Orientation from 'react-native-orientation'


interface Props {
    style?: StyleProp<{}>,
    expand: boolean
    startHeight: number
    onRotationChange?: () => void
}

interface State {
    heightAnim: Animated.Value
    nextRotation: string
}

const ANIMATION_DURATION = 300
const FULLSCREEN_OFFSET = 2.1

export class ExpandableRotationContainer extends React.Component<Props, State> {
    public state: State = {
        heightAnim: new Animated.Value(0),
        nextRotation: '90deg',
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

    public componentDidMount() {
        Orientation.addSpecificOrientationListener(this.orientationDidChange);
    }

    public componentWillUnmount() {
        Orientation.removeSpecificOrientationListener(this.orientationDidChange)
    }

    public render() {
        const { children } = this.props
        return (
            <Animated.View style={this.getStyles()}>
                <Animated.View style={this.getInnerStyles()}>
                    {children}
                </Animated.View>
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

    private getInnerStyles() {
        const { startHeight } = this.props
        const { heightAnim, nextRotation } = this.state

        const widthInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [Dimensions.get('window').width, Dimensions.get('window').height],
        })

        const heightInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [startHeight, Dimensions.get('window').width],
        })

        const rotateInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', nextRotation]
        })

        const offsetInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -startHeight / FULLSCREEN_OFFSET],
        })

        return [
            {
                backgroundColor: 'blue',
                height: heightInterpolation,
                width: widthInterpolation,
                left: offsetInterpolation,
                bottom: offsetInterpolation,
                transform: [{ rotate: rotateInterpolation }]
            },
            styles.innerContainer,
        ]
    }

    private orientationDidChange = (orientation: string) => {
        if (orientation === 'LANDSCAPE-LEFT') {
            this.setState({ nextRotation: '90deg' })
            this.animateIn()

        }
        if (orientation === 'LANDSCAPE-RIGHT') {
            this.setState({ nextRotation: '-90deg' })
            this.animateIn()

        }
        if (orientation === 'PORTRAIT') {
            this.setState({ nextRotation: '90deg' })
            this.animateOut()
        }
    }


    private getStyles() {
        const { style, startHeight } = this.props
        const { heightAnim } = this.state

        const heightInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [startHeight, Dimensions.get('window').height],
        })

        return [
            {
                height: heightInterpolation,
                width: Dimensions.get('window').width,
            },
            style,
        ]
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        overflow: 'hidden',

    },
})
