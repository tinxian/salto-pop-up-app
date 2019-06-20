import { AppRegistry, YellowBox } from 'react-native'
import { App } from './App'
import TrackPlayer from 'react-native-track-player'
import appConfig from '../app.json'
import { playBackService } from './trackPlayBackService'

YellowBox.ignoreWarnings(['unknown call: "relay:check"', "'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'"])

AppRegistry.registerComponent(appConfig.name, () => App)
TrackPlayer.registerPlaybackService(() => playBackService)
