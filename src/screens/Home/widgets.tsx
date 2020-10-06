import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { FMWidget } from 'src/components/implementations/Widgets/FMWidget/FMWidget'
import { RssWidget } from 'src/components/implementations/Widgets/RssWidget/RssWidget'
import { TVWidget } from 'src/components/implementations/Widgets/TVWidget/TVWidget'
import { ThemeInjectedProps } from 'src/providers/ThemeProvider'

export interface WidgetType {
    id: string
    title: string | null
    icon: string
    element: JSX.Element
}

export type PassedWidgetProps = ThemeInjectedProps & NavigationScreenProps & { widget: WidgetType }

const props: any = {

}

export const widgets: WidgetType[] = [
    {
        id: '1',
        title: 'MaLive FM',
        icon: 'radio',
        element: <FMWidget {...props} />,
    },
    {
        id: '3',
        title: 'MaLive TV',
        icon: 'videocam',
        element: <TVWidget {...props} />,
    },
    {
        id: '4',
        title: 'MaLive Nieuws',
        icon: 'logo-rss',
        element: <RssWidget {...props} />,
    },
]
