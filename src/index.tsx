import { AppRegistry, YellowBox } from 'react-native'
import { App } from './App'
import TrackPlayer from 'react-native-track-player'
import appConfig from '../app.json'
import { playBackService } from './trackPlayBackService'

YellowBox.ignoreWarnings(['unknown call: "relay:check"'])

AppRegistry.registerComponent(appConfig.name, () => App)
TrackPlayer.registerPlaybackService(() => playBackService)
