import { ImageSourcePropType } from "react-native";
import Config from "react-native-config";

export interface ColorsType {
    NavigationBackgroundColor: string
    NavigationIconsColor: string
    NavigationIconsActiveColor: string
    RadioPlayerControlsColor: string,
    RadioPlayerBackgroundColor: string
    BottomDrawerColor: string
    ButtonColor: string
    ButtonTextColor: string
    LabelBorderColor: string
    LabelBackgroundColor: string
    PageBackgroundColor: string
    SaltoColor: string
    TextColor: string
    SubTitleColor: string
    TitleColor: string
    VideoBackgroundColor: string
    playButtonColor: string
    LiveIndicatorBackgroundColor: string
    LiveIndicatorTextColor: string
    SeperatorColor: string
    HeaderBackground: string
    HeaderTitleText: string
    HeaderBackButtonColor: string
    WidgetBackgroundColor: string
}
export interface ImagesType {
    HeaderBackgroundUrl: ImageSourcePropType
    defaultThumbnail: ImageSourcePropType
}

export interface LinkType {
    title: string
    link: string
    logo: string
}

export interface GeneralContentType {
    App: AppType
    general: ContentType
    OtherEvents: OtherEventType[]
}

export interface AppType {
    startDate: string
    endDate: string
}

export interface ContentType {
    AftermovieId: string
    HighlightedVideoIds: string[]
    EventName: string
    RadioName: string
    AppIntroduction: string
    livestreamIntroduction: string
    videosIntroduction: string
}

export interface OtherEventType {
    title: string
    subtitle: string
    logo: string
    androidLink: string
    iosLink: string
}

export interface ThemeType {
    colors: ColorsType
    links: LinkType[]
    images: ImagesType
    content: GeneralContentType
}

export interface ThemeContextType {
    theme: ThemeType
    setThemeState: (values: ThemeType) => void
}


export class Theme {
    public static getExternalTheme() {
        return Config.EXTERNAL_THEME_URL
    }

}