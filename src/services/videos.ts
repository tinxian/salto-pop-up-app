import axios, { AxiosResponse } from 'axios'
import { format } from 'date-fns'

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
            const result: AxiosResponse<EpisodeResponseType> = await axios.get('https://vod.salto.nl/data/ondemand/pride')

            return result.data.episodes
        } catch (err) {
            console.log(err)

            return []
        }
    }

    public static async getScheduleByChannel(channel: string) {
        try {
            const date = format(new Date(), 'YYYYMMDD')
            const result: AxiosResponse<ScheduleResponseType> = await axios.get(`https://api.salto.nl/api/schedule/${channel}/day/${date}`)
            console.log(result)
            const schedule = result.data.schedule.filter(item => item.time.replace(':', '') >= format(new Date(), 'HHmm'))
            schedule.sort((a, b) => parseInt(a.time, 10) - parseInt(b.time, 10))

            return schedule
        } catch (err) {
            console.log(err)

            return []
        }
    }
}
