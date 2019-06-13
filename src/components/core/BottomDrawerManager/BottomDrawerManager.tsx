import * as React from 'react'
import { BottomDrawer } from '../BottomDrawer/BottomDrawer'
import { ModalManager } from '../ModalManager/ModalManager'

export interface Props {
    renderHandler: (openBottomDrawer: () => void) => JSX.Element
    renderContent: (closeModal: () => void) => JSX.Element
    requestOpenBottomDrawer: boolean
}

export class BottomDrawerManager extends React.Component<Props, {}> {

    public render() {
        const { renderContent } = this.props

        return (
            <ModalManager
                renderHandler={open => this.renderHandlerComponent(open)}
                renderModal={closeModal => (

                    <BottomDrawer
                        onDismiss={closeModal}
                        children={renderContent(closeModal)}
                    />
                )}
            />
        )
    }

    private renderHandlerComponent(open: () => void) {
        const { requestOpenBottomDrawer, renderHandler } = this.props

        if (requestOpenBottomDrawer) {
            open()
        }

        return (
            <React.Fragment>
                {renderHandler(open)}
            </React.Fragment>
        )

    }
}
