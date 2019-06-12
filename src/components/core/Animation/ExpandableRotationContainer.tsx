import * as React from 'react'
import { StyleProp, Animated, Dimensions } from 'react-native'
import Orientation from 'react-native-orientation'

interface Props {
    style?: StyleProp<{}>,
    expand: boolean
    startHeight: number
    disableAnimation: boolean
    onRotationChange?: () => void
}

interface State {
    heightAnim: Animated.Value
    nextRotation: string
}

const ANIMATION_DURATION = 300

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
                console.log('out')
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
            <Animated.View style={this.getOuterContainerStyles()}>
                <Animated.View style={this.getRotationContainerStyles()}>
                    <Animated.View style={this.getInnerContainerViewStyles()}>
                        {children}
                    </Animated.View >
                </Animated.View>
            </Animated.View>
        )
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

    private animateIn() {
        const { heightAnim } = this.state
        const { disableAnimation } = this.props

        if (disableAnimation) {
            this.setState({ heightAnim: new Animated.Value(1) })
            return
        }

        Animated.timing(
            heightAnim,
            {
                toValue: 1,
                duration: ANIMATION_DURATION,
            }
        ).start()
    }

    private animateOut() {
        const { disableAnimation } = this.props
        const { heightAnim } = this.state

        if (disableAnimation) {
            this.setState({ heightAnim: new Animated.Value(0) })
            return
        }

        Animated.timing(
            heightAnim,
            {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }
        ).start()
    }

    private getOuterContainerStyles() {
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

    private getRotationContainerStyles() {
        const { startHeight } = this.props
        const { heightAnim, nextRotation } = this.state
        const deviceWidth = Dimensions.get('window').width

        const heightInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [startHeight, deviceWidth],
        })

        const rotateInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', nextRotation]
        })

        return [
            {
                height: heightInterpolation,
                transform: [
                    { rotate: rotateInterpolation },
                ]
            },
        ]
    }

    private getInnerContainerViewStyles() {
        const { heightAnim, nextRotation } = this.state
        const { startHeight } = this.props
        const deviceHeight = Dimensions.get('window').height
        const deviceWidth = Dimensions.get('window').width

        const widthInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [deviceWidth, deviceHeight],
        })

        const heightInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [startHeight, deviceWidth],
        })

        const offsetInterpolation = heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -startHeight],
        })

        return [
            {

                height: heightInterpolation,
                width: widthInterpolation,
            },
            nextRotation === '-90deg' && { left: offsetInterpolation }
        ]

    }
}