
import React from 'react'
import Orientation from 'react-native-orientation'
import { NavigationScreenProps, NavigationParams } from 'react-navigation';

export class PortraitScreen<TProps = {}, TState = {}> extends React.Component<TProps & NavigationScreenProps, TState> {
    public orientationFocusSubscription: any

    public componentDidMount() {
        this.orientationFocusSubscription = this.props.navigation.addListener('willFocus', payload => {
            Orientation.lockToPortrait()
            Orientation.addOrientationListener(this.orientationDidChange)
        })
        this.orientationFocusSubscription = this.props.navigation.addListener('willBlur', payload => {
            Orientation.unlockAllOrientations()
            Orientation.removeOrientationListener(this.orientationDidChange)
        })
    }

    public componentWillUnmount() {
        // remove subscription when unmount
        this.orientationFocusSubscription.remove()
        Orientation.removeOrientationListener(this.orientationDidChange)
    }

    private orientationDidChange = (orientation: string) => {
        if (orientation === 'LANDSCAPE') {
            Orientation.lockToPortrait()
        }
    }
}

export interface LandscapeAndPortraitScreenStateType {
    isLandscape: boolean
}

export class LandscapeAndPortraitScreen<TProps = {}, TState = {}>
    extends React.Component<TProps & NavigationScreenProps, LandscapeAndPortraitScreenStateType, TState> {
    public orientationFocusSubscription: any

    constructor(props: TProps & NavigationScreenProps<NavigationParams>) {
        super(props)

        this.orientationFocusSubscription = this.props.navigation.addListener('willFocus', payload => {
            Orientation.addOrientationListener(this.orientationDidChange)
        })
        this.orientationFocusSubscription = this.props.navigation.addListener('willBlur', payload => {
            Orientation.removeOrientationListener(this.orientationDidChange)
        })
    }

    public componentWillUnmount() {
        // remove subscription when unmount
        this.orientationFocusSubscription.remove()
        Orientation.removeOrientationListener(this.orientationDidChange)
    }

    private orientationDidChange = (orientation: string) => {
        if (orientation === 'LANDSCAPE') {
            this.setState({ isLandscape: true })

        }
        this.setState({ isLandscape: false })

    }
}
