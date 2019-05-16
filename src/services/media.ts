import SoundPlayer from 'react-native-sound-player'

export class Media {
    public static stopOtherMedia() {
        SoundPlayer.pause()
    }
}

export interface musicDataType {
    artists: string[]
    title: string
}

export interface LiveStreamDataType {
    artwork: string
    channel: string
    duration: number
    link: string
    live: boolean
    logo: string
    news: boolean
    music: musicDataType
    poster: string
    time: Date
    title: string
}
