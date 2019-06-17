import { Platform, Linking } from "react-native";
import SafariView from "react-native-safari-view";
// import { CustomTabs } from "react-native-custom-tabs";

export function openPlatformSpecificWebViews(url: string) {
    if (Platform.OS === 'ios') {
        SafariView.show({
            url: url,
            fromBottom: true,
        })
        return
    }

    if (Platform.OS === 'android') {
        // CustomTabs.openURL(url)
        return
    }

    Linking.openURL(url)
}