import * as React from 'react';

interface State {
    isPaused: boolean;
}

export class RadioPlayer extends React.Component<{}, State> { 
    src = "http://radio.krlx.org/mp3/high_quality";
    type = 'audio/mpeg;codecs="mp3"';

    audio: HTMLAudioElement;
    isPaused: boolean;

    toggle = () => {
        this.state.isPaused ? this.audio.play() : this.audio.pause();
        this.setState(prev => ({ isPaused: !prev.isPaused }));
    }

    constructor() {
        super();
        this.state = { isPaused: true }
    }


    render() {
        return(
            <div>
                <audio src = {this.src} 
                       type = {this.type} 
                       ref = {(audio) => this.audio = audio}/>
                <button onClick = {this.toggle}>
                    {this.state.isPaused ? "Play" : "Pause"}
                </button>
            </div>
        )
    }
}