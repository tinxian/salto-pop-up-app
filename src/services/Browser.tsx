import { Platform, Linking } from "react-native";
import SafariView from "react-native-safari-view";
import { CustomTabs } from "react-native-custom-tabs";
import { debounce } from "lodash";

export const openPlatformSpecificWebViews = debounce(
    (url: string) => {
        if (Platform.OS === 'ios') {
            SafariView.show({
                url: url,
                fromBottom: true,
            })
            return
        }

        if (Platform.OS === 'android') {
            CustomTabs.openURL(url, {
                enableUrlBarHiding: true,
                showPageTitle: true,
                enableDefaultShare: true,
                animations: {
                    startEnter: 'slide_in_bottom',
                    startExit: 'slide_out_bottom',
                    endEnter: 'slide_in_bottom',
                    endExit: 'slide_out_bottom',
                },
            })
            return
        }

        Linking.openURL(url)
    },
    2500,
    { leading: true, trailing: false }
)
