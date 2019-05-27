import Config from "react-native-config"
import firebase from 'react-native-firebase'

interface VideoEvent {
    title: string
    id: string
    url: string
    duration: string
}

class Analytics {

    public timer: number

    constructor() {
        this.timer = 0
    }

    public getAnalyticsID() {
        return Config.ANALYTICS_ID
    }

    public async trackScreen(screen: string) {
        await firebase.analytics().setCurrentScreen(screen)
    }

    public async trackVideoEvent(event: string, videoParams: VideoEvent) {
        await firebase.analytics().logEvent(event, videoParams)
    }
}

export const AnalyticsData = new Analytics()
