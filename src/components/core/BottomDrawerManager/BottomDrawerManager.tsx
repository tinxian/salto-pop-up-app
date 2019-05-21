import * as React from 'react'
import { BottomDrawer } from '../BottomDrawer/BottomDrawer'
import { ModalManager } from '../ModalManager/ModalManager'

export interface Props {
    renderHandler: (openBottomDrawer: () => void) => JSX.Element
    renderContent: (closeModal: () => void) => JSX.Element
}

export class BottomDrawerManager extends React.Component<Props, {}> {

    public render() {
        const { renderHandler, renderContent } = this.props

        return (
            <ModalManager
                renderHandler={renderHandler}
                renderModal={closeModal => (

                    <BottomDrawer
                        onDismiss={closeModal}
                        children={renderContent(closeModal)}
                    />
                )}
            />
        )
    }
}
