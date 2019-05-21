import React from 'react'

import { ModalView } from '../Modal/ModalView'
import { EventAttentionModal } from './EventAttentionModal';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { ModalManager } from '../Modal/ModalManager';
import { Button, View } from 'react-native';
import { isPast } from 'date-fns';


interface Props {
}

interface State { }

export enum AppNotifcationTypeValue {
    EventStopped = 'EventStopped',
}

export const AppNotificationManager = withThemeContext(
    class AppNotificationManager extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            dataIndex: 0,
        }

        public render() {
            const { themeContext } = this.props

            return (
                <ModalManager
                    renderHandler={open => this.renderHandler(open)}
                    renderModal={closeModal => (
                        <ModalView
                            onAction={closeModal}
                            actionText={'Ga door naar de app '}
                            theme={themeContext.theme}
                        >
                            <EventAttentionModal theme={themeContext.theme} />
                        </ModalView>
                    )}
                />

            )
        }

        private renderHandler(open: () => void) {
            const { endDate } = this.props.themeContext.theme.content.App

            if (isPast(endDate)) {
                open()
            }

            return <View />
        }
    }
)
