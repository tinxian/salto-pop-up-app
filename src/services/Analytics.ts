import Config from 'react-native-config'
import firebase from 'react-native-firebase'

interface VideoAnalyticsEvent {
    title: string
    id: string
    url: string
    videoDuration: string
}

interface LivestreamEvent {

}

interface SocialLinkAnalyticsEvent {
    title: string
    link: string
}

class Analytics {
    public getAnalyticsID() {
        return Config.ANALYTICS_ID
    }

    public async trackScreen(screen: string) {
        await firebase.analytics().setCurrentScreen(screen)
    }

    public async trackOndemandVideoClickEvent(videoParams: VideoAnalyticsEvent) {
        await firebase.analytics().logEvent('ondemand_video_click_event', videoParams)
    }

    public async trackLivesteamClickEvent(livestreamParams: LivestreamEvent) {
        await firebase.analytics().logEvent('livestream_click_event', livestreamParams)
    }

    public async trackShareClickEvent(shareEvent: VideoAnalyticsEvent) {
        await firebase.analytics().logEvent('share_button_click', shareEvent)
    }

    public async trackSocialLinkEvent(socialEvent: SocialLinkAnalyticsEvent) {
        await firebase.analytics().logEvent('social_link_button_click', socialEvent)
    }
}

export const AnalyticsData = new Analytics()
