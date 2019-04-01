import React from 'react'
import {
   View,
   StyleSheet,
   StyleProp,
   WebView,
} from 'react-native'

interface Props {
    style?: StyleProp<{}>
    uri: string
}

interface State {
    content: string
}

export class WebViewImage extends React.Component<Props, State> {

    public state: State = {
        content: '',
    }

    public async componentDidMount() {
        const response = await fetch(this.props.uri)
        const content = await response.text()

        this.setState({
            content,
        })
    }

    public render() {
        const { content } = this.state
        return (
            <View style={this.getStyles()}>
                <WebView
                    originWhitelist={['*']}
                    style={{ width: 70, height: 20 }}
                    scrollEnabled={false}
                    source={{
                        html: `
                            <html>
                                <head>
                                    <style>
                                        html, body {
                                            margin:0;
                                            padding:0;
                                            overflow:hidden;
                                            background-color: transparent;
                                        }
                                        svg {
                                            position:fixed;
                                            top:0;
                                            left:0;
                                            right: 0;
                                            bottom: 0;
                                            height:100%;
                                            width:100%;
                                        }
                                    </style>
                                </head>
                                <body>
                                    ${content}
                                </body>
                            </html>
                        `,
                    }}
                />
            </View>
        )
    }

    private getStyles(): StyleProp<{}> {
        const { style } = this.props

        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 20,
    },
})
