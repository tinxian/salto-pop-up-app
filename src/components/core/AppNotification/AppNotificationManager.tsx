import React from 'react'

import { ModalView } from '../Modal/ModalView'
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';
import { View, AsyncStorage } from 'react-native';
import { isPast } from 'date-fns';
import { ModalManager } from '../ModalManager/ModalManager';
import { EventAttentionModal } from '../Modal/EventAttentionModal';


interface Props {
}

interface State {
    dataIndex: number
    closed: boolean | null
}

export enum AppNotifcationTypeValue {
    EventStopped = 'EventStopped',
}

export const AppNotificationManager = withThemeContext(
    class AppNotificationManager extends React.Component<Props & ThemeInjectedProps, State> {
        public state: State = {
            dataIndex: 0,
            closed: null,
        }

        public async componentDidMount() {
            const isDismissed = await AsyncStorage.getItem('EventStoppedDismissed')

            if (isDismissed) {
                this.setState({ closed: true })
            }
            if (!isDismissed) {
                this.setState({ closed: false })
            }

        }

        public render() {
            const { themeContext } = this.props

            return (
                <ModalManager
                    renderHandler={open => this.renderHandler(open)}
                    renderModal={closeModal => (
                        <ModalView
                            onAction={() => this.handleClose(closeModal)}
                            actionText={'Ga door naar de app '}
                            theme={themeContext.theme}
                        >
                            <EventAttentionModal theme={themeContext.theme} />
                        </ModalView>
                    )}
                />

            )
        }

        private handleClose = async (closeModal: () => void) => {
            await AsyncStorage.setItem('EventStoppedDismissed', 'true')
            closeModal()
        }

        private renderHandler(open: () => void) {
            const { endDate } = this.props.themeContext.theme.content.App
            const { closed } = this.state

            if (!closed && closed !== null && isPast(endDate)) {
                open()
                this.setState({ closed: true })
            }

            return <View />
        }
    }
)