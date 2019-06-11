import Config from 'react-native-config'
import firebase from 'react-native-firebase'

interface VideoEvent {
    title: string
    id: string
    url: string
    videoDuration: string
}

interface LivestreamEvent {

}

class Analytics {
    public getAnalyticsID() {
        return Config.ANALYTICS_ID
    }

    public async trackScreen(screen: string) {
        await firebase.analytics().setCurrentScreen(screen)
    }

    public async trackOndemandVideoClickEvent(videoParams: VideoEvent) {
        await firebase.analytics().logEvent('consumed_ondemand_video', videoParams)
    }

    public async trackLivesteamClickEvent(livestreamParams: LivestreamEvent) {
        await firebase.analytics().logEvent('consumed_ondemand_video', livestreamParams)
    }

    public async trackShareClickEvent(shareEvent: string) {
        await firebase.analytics().logEvent('clicked_share_button', shareEvent)
    }

    public async trackSocialLinkEvent(socialEvent: string) {
        await firebase.analytics().logEvent('clicked_social_button', socialEvent)
    }
}

export const AnalyticsData = new Analytics()
