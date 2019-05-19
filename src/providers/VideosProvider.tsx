import React, { Context } from 'react'
import { Videos, EpisodeType } from 'src/services/videos.js';

export interface VideosContextType {
    episodes: EpisodeType[]
    loading: boolean
    refresh: () => void
}

export const VideosContext: Context<VideosContextType> = React.createContext({
    episodes: [],
    loading: true,
    refresh: () => 'Context not set',
})

export class VideosProvider extends React.Component<{}, {}> {
    public state: VideosContextType = {
        episodes: [],
        loading: true,
        refresh: () => this.getVideos(),
    }

    public async componentDidMount() {
        await this.getVideos()
    }

    public render() {
        const { children } = this.props

        return (
            <VideosContext.Provider
                value={this.state}
            >
                {children}
            </VideosContext.Provider>
        )
    }

    private async getVideos() {
        this.setState({ loading: true })
        const episodes = await Videos.getAllVideos()
        console.log(episodes)
        this.setState({ episodes, loading: false })
        return true
    }
}

const hoistStatics = require('hoist-non-react-statics')

export interface VideosInjectedProps {
    videosContext: VideosContextType
}

export function withVideosContext<Props>(Component: React.ComponentClass<VideosInjectedProps & Props>) {
    class ComponentWithTheme extends React.Component<VideosInjectedProps & Props, {}> {

        public render() {
            return (

                <VideosContext.Consumer>
                    {
                        context => <Component {...this.props} videosContext={context} />
                    }
                </VideosContext.Consumer>
            )
        }
    }

    return hoistStatics(ComponentWithTheme, Component) as React.ComponentClass<Props>
}
