import { isWithinRange } from 'date-fns';
import * as React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { LiveStreamDataType } from 'src/services/media';
import { LivestreamItem } from '../../LivestreamItem/LivestreamItem';
import { OnDemandVideoItem } from '../../OnDemandVideoItem/OnDemandVideoItem';
import { withThemeContext } from 'src/providers/ThemeProvider';
import { VideosInjectedProps, withVideosContext } from 'src/providers/VideosProvider';
import { PassedWidgetProps } from 'src/screens/Home/widgets';

interface Props {
    style?: StyleProp<{}>
}

interface State {
    loading: boolean
    active: boolean
    programData?: LiveStreamDataType
}

export const TVWidget = withThemeContext(withVideosContext(
    class TVWidget extends React.Component<Props & PassedWidgetProps & VideosInjectedProps, State> {

        public state: State = {
            loading: false,
            active: false,
            programData: undefined,
        }

        public render() {

            return (
                <View style={this.getStyles()}>
                    {this.getMedia()}
                </View>
            )
        }

        private getMedia() {
            const { theme } = this.props.themeContext
            const { episodes } = this.props.videosContext
            const currentDate = new Date()
            const afterMovie = episodes.find(episode => episode.id === theme.content.general.AftermovieId)

            if (isWithinRange(currentDate, theme.content.App.startDate, theme.content.App.endDate)) {
                return (
                    <LivestreamItem
                        theme={theme}
                        onPress={() => this.props.navigation.navigate('LivestreamVideoScreen')}
                        thumbnail={theme.images.defaultThumbnail}
                    />
                )
            }

            if (afterMovie) {
                return (
                    <OnDemandVideoItem
                        onPress={() => this.props.navigation.navigate('OnDemandVideoScreen', { item: afterMovie })}
                        poster={{ uri: afterMovie.poster }}
                        theme={theme}
                        title={afterMovie.title}
                        programName={afterMovie.programName}
                        item={afterMovie}
                    />
                )
            }

            return null
        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
                style,
            ]
        }
    }
))

const styles = StyleSheet.create({
    container: {
    }
})
