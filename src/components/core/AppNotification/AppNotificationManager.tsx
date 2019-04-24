import React from 'react'

import { ModalView } from '../Modal/ModalView'
import { ConfigType } from 'src/providers/ThemeProvider'


interface Props {
    config: ConfigType
}

interface State { }

export enum AppNotifcationTypeValue {
    EventStopped = 'EventStopped',
}

export class AppNotificationManager extends React.Component<Props, State> {
    public state: State = {
        dataIndex: 0,
    }

    public render() {
        const { config } = this.props

        return (
            <ModalView
                onRequestClose={() => undefined}
                onAction={() => undefined}
                actionText={'test'}
                title={'title'}
            >
                {/* {this.renderModal()} */}
            </ModalView>
        )
    }

    // private renderModal = (item: AppNotificationType) => {
    //     return {
    //         [AppNotifcationTypeValue.statusChange]: <FeedbackAttentionModal appNotification={item} />,
    //     }[item.type]
    // }

    // private handleAction = async (item: AppNotificationType, callback?: () => any) => {
    //     const { onShowMore } = this.props

    //     await this.handleCloseModal(item)

    //     if (onShowMore) {
    //         onShowMore()
    //     }
    // }

    // private handleCloseModal = async (item: AppNotificationType) => {
    //     const { onRequestClose } = this.props

    //     // await this.readNotification(item)

    //     if (onRequestClose) {
    //         onRequestClose()
    //     }
    // }
}