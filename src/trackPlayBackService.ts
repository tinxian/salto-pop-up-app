// service.js
import TrackPlayer from 'react-native-track-player'
import { Media } from 'src/services/media';

export const playBackService = async function () {

    TrackPlayer.addEventListener('remote-play', () => {
        Media.stopOtherMedia(); TrackPlayer.play()
    })

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy())
}