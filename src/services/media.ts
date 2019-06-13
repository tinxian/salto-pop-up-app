import { ScheduleResponseType } from './videos';
import { format } from 'date-fns';
import axios, { AxiosResponse } from 'axios'
import Config from 'react-native-config'
import { RadioBar } from 'src/components/implementations/RadioBar/RadioBar'
import TrackPlayer from 'react-native-track-player'

export interface MusicDataType {
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
    music: MusicDataType
    poster: string
    time: Date
    title: string
}

export class Media {
    public static stopOtherMedia() {
        RadioBar.radioDispatcher.dispatch('stopRadio')
        TrackPlayer.pause()
    }

    public static startRadio() {
        RadioBar.radioDispatcher.dispatch('startRadio')
    }

    public static openRadioScreen() {
        RadioBar.radioDispatcher.dispatch('openRadioScreen')
    }

    public static async getScheduleByChannel(channel: string) {
        try {
            const date = format(new Date(), 'YYYYMMDD')
            const result: AxiosResponse<ScheduleResponseType> =
                await axios.get(`https://api.salto.nl/api/schedule/${channel}/day/${date}`)

            const schedule = result.data.schedule.filter(item => item.time.replace(':', '') >= format(new Date(), 'HHmm'))
            schedule.sort((a, b) => parseInt(a.time, 10) - parseInt(b.time, 10))

            return schedule
        } catch (err) {
            return []
        }
    }

    public static getRadioChannelName() {
        return Config.RADIO_CHANNEL_NAME
    }
}