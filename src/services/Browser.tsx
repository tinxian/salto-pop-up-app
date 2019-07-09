import { Platform, Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { debounce } from 'lodash'

export const openPlatformSpecificWebViews = debounce(
    (url: string) => {
        if (InAppBrowser.isAvailable()) {
            if (Platform.OS === 'ios') {
                InAppBrowser.open(url, {
                    dismissButtonStyle: 'cancel',
                    readerMode: false,

                })
                return
            }

            if (Platform.OS === 'android') {
                InAppBrowser.open(url, {
                    showTitle: true,
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                })
                return
            }
        }

        Linking.openURL(url)
    },
    1000,
    { leading: true, trailing: false }
)
