// service.js
import TrackPlayer from 'react-native-track-player'
import { Media } from 'src/services/media'
import { Platform } from 'react-native'

export const playBackService = async function () {

    TrackPlayer.addEventListener('remote-play', () => {
        Media.stopOtherMedia(); TrackPlayer.play()
    })

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy())
}

export async function isMusicActive() {
    const active = await TrackPlayer.getState()
    if (Platform.OS === 'android') {
        return active === 3
    }
    return active === 'playing'
}
