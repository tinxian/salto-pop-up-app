import * as React from 'react'
import {
    PanResponderGestureState,
    Animated,
    View,
    TouchableWithoutFeedback,
    GestureResponderEvent,
    PanResponder,
    Dimensions,
    StyleSheet,
} from 'react-native'
interface Props {
    downDisplay?: number
    onDismiss: () => void
    children: any
}
interface State {
    currentPosition: number
    active: boolean
}
const SWIPABLE_HEIGHT = 60
function getScreenHeight() {
    return Dimensions.get('window').height
}
function getHalfScreenHeight() {
    return 350
}
export class BottomDrawer extends React.Component<Props, State> {
    public UP_POSITION = 0
    public DOWN_POSITION = getScreenHeight()
    public state: State = {
        currentPosition: this.DOWN_POSITION,
        active: true,
    }
    public panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, state) => this.handlePanResponderMove(e, state),
        onPanResponderRelease: (e, state) => this.handlePanResponderRelease(e, state),
    })
    private TOGGLE_THRESHOLD = getHalfScreenHeight() / 11
    private animatedPosition = new Animated.Value(this.state.currentPosition)
    public componentDidMount() {
        this.HandleOnToggle()
    }
    public componentDidUpdate(prevProps: Props, prevState: State) {
        const { active } = this.state
        if (prevState.active !== active) {
            this.HandleOnToggle()
        }
    }
    public handlePanResponderMove = (
        e: GestureResponderEvent,
        gesture: PanResponderGestureState
    ) => {
        if (this.swipeInBounds(gesture)) {
            this.animatedPosition.setValue(this.state.currentPosition + gesture.dy)
        } else {
            this.animatedPosition.setValue(this.UP_POSITION)
        }
    }
    public handlePanResponderRelease = (
        e: GestureResponderEvent,
        gesture: PanResponderGestureState
    ) => {
        const { currentPosition } = this.state
        if (gesture.dy > this.TOGGLE_THRESHOLD && currentPosition === this.UP_POSITION) {
            this.transitionTo(this.DOWN_POSITION)
            this.handleOnDismiss()
        } else if (gesture.dy < -this.TOGGLE_THRESHOLD && currentPosition === this.DOWN_POSITION) {
            this.transitionTo(this.UP_POSITION)
        } else {
            this.transitionTo(this.DOWN_POSITION)
        }
    }
    public render() {
        const { children } = this.props
        const { active } = this.state
        return (
            <View
                pointerEvents={!active ? 'none' : 'auto'}
                style={{
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    bottom: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <TouchableWithoutFeedback onPress={() => this.handleOnDismiss()}>
                    <View
                        style={{
                            height: getScreenHeight(),
                            width: '100%',
                            flex: 1,
                            position: 'absolute',
                        }}
                    />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[
                        styles.animationContainer,
                        {
                            height: getHalfScreenHeight(),
                            bottom: 0,
                            transform: [{ translateY: this.animatedPosition }],
                        },
                    ]}
                >
                    {/* for some reason we have to set backgroundColor for panResponder to work on android */}
                    <View {...this.panResponder.panHandlers} style={{ backgroundColor: 'transparent' }}>
                        <View style={styles.swiperContainer} >
                            <View style={styles.swiper} />
                        </View>
                    </View>
                    <View style={[styles.content, { height: getHalfScreenHeight() - SWIPABLE_HEIGHT }]}>
                        {children}
                    </View>
                </Animated.View>
            </View >
        )
    }
    private HandleOnToggle = () => {
        const { active } = this.state
        if (active) {
            this.transitionTo(this.UP_POSITION)
        } else {
            this.transitionTo(this.DOWN_POSITION)
        }
    }
    private swipeInBounds(gesture: PanResponderGestureState) {
        return this.state.currentPosition + gesture.dy > this.UP_POSITION
    }
    private transitionTo(position: number) {
        Animated.spring(this.animatedPosition, {
            toValue: position,
            useNativeDriver: true,
        }).start()
        this.setState({ currentPosition: position })
    }
    private handleOnDismiss = () => {
        const { onDismiss } = this.props
        const { active } = this.state
        this.setState({ active: !active })
        onDismiss()
    }
}
const styles = StyleSheet.create({
    animationContainer: {
        width: '100%',
    },
    swiperContainer: {
        width: '100%',
        height: SWIPABLE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',

    },
    swiper: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 15,
        top: 12,
        height: 6,
        width: 48,
    },
    content: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
})
