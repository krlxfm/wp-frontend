import * as React from 'react';
import {observer} from 'mobx-react'

import { RadioStore, Song } from '../stores/radio';

interface Props {
    radioStore: RadioStore;
}

const HistoryLi = (song: Song) => (
    <li key={song.timestamp}>{song.artist} - {song.title}</li>
)

@observer
export class RadioHistory extends React.Component<Props, {}> {
    render() {
        let songs = this.props.radioStore.songs;
        return(
            <div>
                History
                <ul>{...songs.map(HistoryLi)}</ul>
            </div>
        )
    }
}