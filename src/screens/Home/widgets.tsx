
import { TVWidget } from "src/components/implementations/Widgets/TVWidget/TVWidget";
import React from "react";
import { FMWidget } from "src/components/implementations/Widgets/FMWidget/FMWidget";
import { ThemeInjectedProps } from "src/providers/ThemeProvider";
import { NavigationScreenProps } from "react-navigation";

export interface WidgetType {
    id: string
    title: string
    element: JSX.Element
}

export type PassedWidgetProps = ThemeInjectedProps & NavigationScreenProps

export const widgets: WidgetType[] = [
    {
        id: '1',
        title: 'Pride FM',
        element: <FMWidget />,
    },
    {
        id: '1',
        title: 'Pride TV',
        element: <TVWidget />,
    },
]