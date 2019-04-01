import React from 'react'
import {
   View,
   StyleSheet,
   StyleProp,
   Image,
} from 'react-native'

enum SpinnerStyle {
    white = 'white',
    purple = 'purple',
}

interface Props {
    style?: StyleProp<{}>
    animating?: boolean
}

interface State {
    style: SpinnerStyle
    frame: number
}

const frames = {
    white: [
        require('../../../assets/images/Animation/Loader/White/White-Animated-0.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-1.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-2.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-3.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-4.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-5.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-6.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-7.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-8.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-9.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-10.png'),
        require('../../../assets/images/Animation/Loader/White/White-Animated-11.png'),
    ],
    purple: [
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-0.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-1.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-2.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-3.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-4.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-5.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-6.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-7.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-8.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-9.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-10.png'),
        require('../../../assets/images/Animation/Loader/Purple/Purple-Animated-11.png'),
    ],
}

export class BoilerplateSpinner extends React.Component<Props, State> {

    public static defaultProps: Partial<Props> = {
        animating: true,
    }

    public state: State = {
        style: SpinnerStyle.white,
        frame: 0,
    }

    private animation: number

    public componentDidMount() {

        this.animation = setInterval(() => {
            if (!this.props.animating) {
                return
            }

            this.setState(state => {
                if (state.frame === 11) {
                    return {
                        frame: 0,
                    }
                }

                return {
                    frame: state.frame + 1,
                }
            })
        }, 33)
    }

    public componentWillUnmount() {
        clearInterval(this.animation)
    }

    public render() {
        const { frame } = this.state
        return (
            <View style={this.getStyles()}>
                <Image
                    source={frames.white[frame]}
                    resizeMode={'contain'}
                    style={styles.image}
                />
            </View>
        )
    }

    private getStyles(): StyleProp<{}> {
        const { style } = this.props

        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        width: 48,
        height: 48,
    },
    image: {
        width: 48,
        height: 48,
    },
})
