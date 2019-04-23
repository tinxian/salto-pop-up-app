import SoundPlayer from 'react-native-sound-player'

export class Media {
    public static stopOtherMedia() {
        SoundPlayer.pause()
    }
}