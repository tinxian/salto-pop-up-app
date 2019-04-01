import Config from 'react-native-config'

export const environment = {
    development: Config.BOILERPLATE_DEVELOPMENT === 'true' ? true : false,
}
