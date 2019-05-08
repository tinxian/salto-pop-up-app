import SoundPlayer from 'react-native-sound-player'

export class Media {
    public static stopOtherMedia() {
        SoundPlayer.pause()
    }
}

export interface LiveStreamDataType {
    artwork: string
    channel: string
    duration: number
    link: string
    live: boolean
    logo: string
    poster: string
    time: Date
    title: string
}