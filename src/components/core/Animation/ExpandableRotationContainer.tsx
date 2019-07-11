import * as React from 'react'
import { StyleProp, Animated, Dimensions, Platform } from 'react-native'
import Orientation from 'react-native-orientation-locker'

interface Props {
    style?: StyleProp<{}>,
    startHeight: number
    onRotationChange?: () => void
}

interface State {
    heightAnim: Animated.Value
    nextRotation: string
    fullscreenHeight: number
}

const ANIMATION_DURATION = 300

export class ExpandableRotationContainer extends React.Component<Props, State> {
    public state: State = {
        heightAnim: new Animated.Value(0),
        nextRotation: '90deg',
        fullscreenHeight: 0,
    }

    public animateIn = () => {
        const { heightAnim } = this.state

        Orientation.lockToLandscape()

        Animated.timing(
            heightAnim,
            {
                toValue: 1,
                duration: ANIMATION_DURATION,
            }
        ).start()

    }

    public animateOut = () => {
        const { heightAnim } = this.state

        Orientation.lockToPortrait()

        Animated.timing(
            heightAnim,
            {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }
        ).start()
    }

    public componentDidMount() {
        Orientation.addDeviceOrientationListener(this.orientationDidChange)

        this.setState({ fullscreenHeight: Dimensions.get('screen').width })
    }

    public componentWillUnmount() {
        Orientation.removeDeviceOrientationListener(this.orientationDidChange)
        Orientation.lockToPortrait()
    }

    public render() {
        const { children } = this.props

        return (
            <Animated.View style={this.getOuterContainerStyles()}>
                {children}
            </Animated.View>
        )
    }

    private orientationDidChange = (orientation: string) => {
        if (orientation === 'LANDSCAPE-LEFT') {
            this.animateIn()

        }
        if (orientation === 'LANDSCAPE-RIGHT') {
            this.animateIn()

        }
        if (orientation === 'PORTRAIT') {
            this.animateOut()
        }
    }

    private getOuterContainerStyles() {
        const { style, startHeight } = this.props
        const { heightAnim, fullscreenHeight } = this.state

        const heightInterpolation = heightAnim.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ startHeight, fullscreenHeight ],
        })

        return [
            {
                height: heightInterpolation,
            },
            style,
        ]
    }
}
