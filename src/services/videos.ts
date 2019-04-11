import axios, { AxiosResponse } from 'axios'

export interface EpisodeResponseType {
    episodes: EpisodeType[]
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
        const result: AxiosResponse<EpisodeResponseType> = await axios.get('https://vod.salto.nl/data/ondemand/pride')

        return result
    }
}