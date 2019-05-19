import Config from 'react-native-config'

export const environment = {
    development: Config.SALTO_DEVELOPMENT === 'true' ? true : false,
}
