import axios, { AxiosResponse } from 'axios'
import Config from 'react-native-config'

export interface EpisodeResponseType {
    episodes: EpisodeType[]
}

export interface ScheduleResponseType {
    date: string
    schedule: ScheduleType[]
}

export interface EpisodeType {
    id: string
    title: string
    description: string | null
    programName: string
    date: Date
    lastBroadcast: BroadcastType
    duration: number
    aspect: string
    program: ProgramType
    poster: string
    thumbnail: string
    streams: EpisodeStreamType
}
export interface ScheduleType {
    date: string
    end: string
    link: string
    live: boolean
    name: string
    program: ProgramType
    time: string
    timestamp: Date
    type: 'fixed' | 'caroussel'
}

export interface BroadcastType {

}

export interface ProgramType {
    id: string
    name: string
    featured: boolean
    hide: boolean
    slug: string

}

export interface EpisodeStreamType {
    hls: string
    mp4: string
    dash: string
}

export class Videos {
    public static async getAllVideos() {
        try {
            const result: AxiosResponse<EpisodeResponseType> = await axios.get(`https://vod.salto.nl/data/ondemand/${Config.VIDEOS_CHANNEL_NAME}`)

            return result.data.episodes
        } catch (err) {
            console.log(err)

            return []
        }
    }
    public static getLivestreamUrl() {
        return Config.LIVESTREAM_URL
    }

    public static getVideosChannelName() {
        return Config.VIDEOS_CHANNEL_NAME
    }

    public static getLivestreamChannelName() {
        return Config.LIVESTREAM_CHANNEL_NAME
    }

}
