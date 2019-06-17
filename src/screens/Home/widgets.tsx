
import React from "react";
import { NavigationScreenProps } from "react-navigation";
import { FMWidget } from "src/components/implementations/Widgets/FMWidget/FMWidget";
import { RssWidget } from "src/components/implementations/Widgets/RssWidget/RssWidget";
import { TVWidget } from "src/components/implementations/Widgets/TVWidget/TVWidget";
import { ThemeInjectedProps } from "src/providers/ThemeProvider";

export interface WidgetType {
    id: string
    title: string | null
    icon: string
    element: JSX.Element
}

export type PassedWidgetProps = ThemeInjectedProps & NavigationScreenProps

export const widgets: WidgetType[] = [
    {
        id: '1',
        title: 'Pride FM',
        icon: 'radio',
        element: <FMWidget />,
    },
    {
        id: '3',
        title: 'Pride TV',
        icon: 'videocam',
        element: <TVWidget />,
    },
    {
        id: '4',
        title: 'Rss feed',
        icon: 'logo-rss',
        element: <RssWidget />,
    },
]