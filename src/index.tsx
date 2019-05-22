import { AppRegistry, YellowBox } from 'react-native'
import { App } from './App'
import appConfig from '../app.json'

YellowBox.ignoreWarnings(['unknown call: "relay:check"'])

AppRegistry.registerComponent(appConfig.name, () => App)