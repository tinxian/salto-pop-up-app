import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    LayoutChangeEvent,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Animated,
} from 'react-native'
import { colors } from 'src/utils/colors'

interface State {
    position: number,
    height: number,
    width: number,
    scrolling: boolean,
    lastOffset: number
}

interface Props<TData> {
    data: TData[]
    startPosition?: number
    onPositionChange?: (index: number) => void
    onPositionChanged?: (index: number) => void
    onPress?: (item: TData, index: number) => void
    onMomentumChange?: () => void
    renderComponent: (item: TData, index: number) => JSX.Element
    renderDots?: (isActive: boolean) => JSX.Element
    renderRightArrow?: () => JSX.Element
    renderLeftArrow?: () => JSX.Element
    viewWidth?: number | string
    disableScroll?: boolean
}

const slideShowConfig = {
    indicatorSize: 8,
    indicatorColor: colors.buttons.active ,
    indicatorActiveColor: colors.buttons.activePressed,
    duration: 300,
    height: 200,
    arrowHeight: 10,
}

export class Swiper<TData> extends Component<Props<TData>, State> {

    public state: State = {
        position: 0,
        height: slideShowConfig.height,
        width: 0,
        scrolling: false,
        lastOffset: 0,
    }

    private slideshowRef: FlatList<TData> | null

    public componentDidUpdate(prevProps: Props<TData>) {
        const { startPosition } = this.props

        if (startPosition && prevProps.startPosition !== this.props.startPosition) {
            this.move(startPosition)
        }
    }

    public next() {
        const { data } = this.props
        const { position } = this.state

        const newPosition = position === data.length - 1 ? 0 : position + 1

        this.move(newPosition)
    }

    public prev() {
        const { data } = this.props
        const { position } = this.state

        const newPosition = position === 0 ? data.length - 1 : position - 1

        this.move(newPosition)
    }

    public move(index: number) {
        const { onPositionChanged } = this.props
        this.setPosition(index)

        if (this.slideshowRef) {
            this.slideshowRef.scrollToIndex({ index })

            if (onPositionChanged) {
                onPositionChanged(index)
            }
        }
    }

    public render() {
        const { disableScroll, data } = this.props
        const { height } = this.state

        return (
            <View
                onLayout={this.onLayout}
                style={[
                    styles.container,
                    { height: height },
                ]}
            >
                <FlatList<TData>
                    ref={ref => this.onRef(ref)}
                    data={data}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={disableScroll}
                    onMomentumScrollEnd={this.onMomentumEnd}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    style={[
                        styles.slideshow,
                        { height: height },
                    ]}
                    renderItem={({ item, index }) => this.renderView(item, index)}
                    keyExtractor={(item, i) => `${i}-${item}`}
                />
                {this.renderDots()}
                {this.rendernavigation()}
            </View >
        )
    }

    private renderView(item: TData, index: number) {
        const { renderComponent } = this.props
        const { width, height } = this.state

        return (
            <View
                key={index}
                style={{ height, width }}
            >
                {renderComponent(item, index)}
            </View>
        )
    }

    private renderDots() {
        const { data, renderDots } = this.props
        const { position } = this.state

        return (
            <View
                style={styles.layoutIndicator}
            >
                {data.map((_, index) => {
                    return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            return this.move(index)
                        }}
                    >
                        {renderDots ? renderDots(position === index) : (
                            <Animated.View
                                style={[
                                    styles.indicator,
                                    position === index && styles.indicatorSelected,
                                ]}
                            />
                        )}
                    </TouchableOpacity>)
                })}
            </View>
        )
    }

    private rendernavigation() {
        const { renderLeftArrow, renderRightArrow } = this.props
        const { height } = this.state
        return (
            <React.Fragment>
                    <View
                        style={
                            [
                                styles.arrowContainer,
                                {
                                    left: 10,
                                    top: height / 2 - slideShowConfig.arrowHeight,
                                    bottom: height / 2 - slideShowConfig.arrowHeight,
                                },
                            ]
                        }
                    >
                        <TouchableOpacity
                            onPress={() => this.prev()}
                        >
                            {renderLeftArrow ? renderLeftArrow() : (
                                <View style={styles.arrow} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.arrowContainer,
                            {
                                right: 10,
                                top: height / 2 - slideShowConfig.arrowHeight,
                                bottom: height / 2 - slideShowConfig.arrowHeight,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => this.next()}
                        >
                            {renderRightArrow ? renderRightArrow() : (
                                <View
                                    style={[ styles.arrow, { transform: [{ rotate:  '180deg' }]} ]}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

            </React.Fragment>
        )
    }

    private onRef(ref: FlatList<TData> | null) {
        this.slideshowRef = ref
        if (ref && this.state.position !== this.getPosition()) {
            this.move(this.getPosition())
        }
    }

    private onLayout = (e: LayoutChangeEvent) => {
        this.setState({ width: e.nativeEvent.layout.width })
    }

    private onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = e.nativeEvent.contentOffset
        const viewSize = e.nativeEvent.layoutMeasurement
        const pageNum = Math.floor(contentOffset.x / viewSize.width)

        this.setPosition(pageNum)
    }

    private getPosition() {
        const { startPosition } = this.props
        const { position } = this.state

        return startPosition ? startPosition : position
    }

    private setPosition(index: number) {
        this.setState({ position: index })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    slideshow: {
        flexDirection: 'row',
        backgroundColor: '#222',
    },
    layoutIndicator: {
        height: 15,
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    indicator: {
        margin: 3,
        opacity: 0.9,
        backgroundColor: slideShowConfig.indicatorColor,
        width: slideShowConfig.indicatorSize,
        height: slideShowConfig.indicatorSize,
        borderRadius: slideShowConfig.indicatorSize / 2,
    },
    indicatorSelected: {
        opacity: 1,
        backgroundColor: slideShowConfig.indicatorActiveColor,
    },
    arrowContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    arrow: {
        width: 0,
        height: 0,
        margin: 5,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopWidth: slideShowConfig.arrowHeight,
        borderBottomWidth: slideShowConfig.arrowHeight,
        borderRightWidth: 20 * 75 / 100,
        borderLeftWidth: 0,
        borderRightColor: 'white',
        borderLeftColor: 'transparent',
    },
})
