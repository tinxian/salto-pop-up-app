// service.js
import TrackPlayer from 'react-native-track-player'

export const playBackService = async function () {

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy())
}