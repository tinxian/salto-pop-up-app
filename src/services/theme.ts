import { ImageSourcePropType } from 'react-native'
import Config from 'react-native-config'
import { TitleSizeType } from 'src/components/core/Typography/Title'

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
    logoUrl: ImageSourcePropType
    defaultThumbnail: ImageSourcePropType
}

export interface LinkType {
    title: string
    link: string
    logo: string
    whitespace?: boolean
}

export interface GeneralContentType {
    App: AppType
    general: ContentType
    urls: ThemeUrlsType
    channels: ThemeChannelsType
    OtherEvents: OtherEventType[]
}

interface ThemeUrlsType {
    LivestreamUrl: string,
    RadioUrl: string,
    RssFeedUrl: string
}

interface ThemeChannelsType {
    VideosChannelName: string,
    RadioChannelName: string,
    LivestreamChannelName: string
}

export interface AppType {
    showDays: boolean
    startDate: string
    endDate: string
}

export interface ContentType {
    AftermovieId: string
    EventName: string
    HomeHeaderTitles: HeaderTitleType[]
    RadioName: string
    AppIntroduction: string
    livestreamIntroduction: string
    videosIntroduction: string
}

export interface HeaderTitleType {
    color?: string
    fontSize?: TitleSizeType | string
    title: string
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
    appState: string
}

export class Theme {
    public static getExternalTheme() {
        return Config.EXTERNAL_THEME_URL
    }

}
