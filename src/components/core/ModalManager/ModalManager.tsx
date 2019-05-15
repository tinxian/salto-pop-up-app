import React from 'react'
import { Modal, StyleProp, Animated, Dimensions, KeyboardAvoidingView } from 'react-native'

export type ModalOpenFN<TModalParams> = (params?: TModalParams) => void

interface Props<TModalParams> {
    style?: StyleProp<{}>
    renderHandler: (openModal: ModalOpenFN<TModalParams>, closeModal: () => void) => JSX.Element
    renderModal: (closeModal: () => void, params?: TModalParams) => (JSX.Element | null)
}

interface State<TModalParams> {
    modalActive: boolean
    animatedOpacity: Animated.Value
    params?: TModalParams
    closeRequested: boolean // closeRequested state is to prevent flickering UI when react-native Modal is set to hidden
}

const MODAL_TRANSITION_DURATION = 200

export class ModalManager<TModalParams = {}> extends React.Component<Props<TModalParams>, State<TModalParams>> {

    public state: State<TModalParams> = {
        modalActive: false,
        animatedOpacity: new Animated.Value(0.01),
        params: undefined,
        closeRequested: false,
    }

    private animating = false

    private AnimatedKeyboardAvoidingView = Animated.createAnimatedComponent(KeyboardAvoidingView)

    public render() {
        const { renderHandler, renderModal } = this.props
        const { modalActive, params, closeRequested } = this.state

        return (
            <React.Fragment>
                {renderHandler(this.handleOpen, this.handleClose)}
                {modalActive && (
                    <Modal
                        animationType={'none'}
                        visible={this.state.modalActive}
                        transparent={true}
                    >
                        {!closeRequested && (
                            <this.AnimatedKeyboardAvoidingView
                                behavior={'padding'}
                                style={{
                                    height: '100%',
                                    width: Dimensions.get('window').width,
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    opacity: this.state.animatedOpacity,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {modalActive && renderModal(this.handleClose, params)}
                            </this.AnimatedKeyboardAvoidingView>
                        )}
                    </Modal>
                )}
            </React.Fragment >
        )
    }

    private handleOpen = (params?: TModalParams) => {
        if (this.animating) {
            return
        }

        this.setState({
            closeRequested: false,
            params: params,
        }, () => {
            this.setState({
                modalActive: true,
            })
        })

        Animated.timing(this.state.animatedOpacity, {
            toValue: 1,
            duration: MODAL_TRANSITION_DURATION,
            useNativeDriver: true,
        }).start(() => {
            this.animating = false
        })

        this.animating = true
    }

    private handleClose = async () => {
        return new Promise((resolve, reject) => {
            if (this.animating) {
                return
            }

            Animated.timing(this.state.animatedOpacity, {
                toValue: 0.01,
                duration: MODAL_TRANSITION_DURATION,
                useNativeDriver: true,
            }).start(() => {
                this.setState({
                    closeRequested: true,
                }, () => {
                    this.setState({
                        modalActive: false,
                    })
                    resolve()
                })

                this.animating = false
            })

            this.animating = true
        })
    }
}
