
import React from "react";
import { NavigationScreenProps } from "react-navigation";
import { FMWidget } from "src/components/implementations/Widgets/FMWidget/FMWidget";
import { TVWidget } from "src/components/implementations/Widgets/TVWidget/TVWidget";
import { ThemeInjectedProps } from "src/providers/ThemeProvider";
import { EventMetaWidget } from "src/components/implementations/Widgets/EventMetaWidget/EventMetaWidget";

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
        id: '1',
        title: null,
        icon: 'information-circle-outline',
        element: <EventMetaWidget />,
    },
    {
        id: '2',
        title: 'Pride TV',
        icon: 'videocam',
        element: <TVWidget />,
    },
]