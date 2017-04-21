import { observable } from 'mobx';

interface TransportLayer {
    getRadioData: () => Promise<RadioJSON>;
}

interface Song {
    title: string,
    show: string,
    artist: string,
    album: string
}

interface RadioShow {
    title: string;
    start: string;
    end: string;
    djs: string[];
}

interface RadioJSON { 
    songs: Song[];
    shows: RadioShow[];
}

export class RadioStore {
    @observable songs: Song[];
    @observable shows: RadioShow[];

    transportLayer: TransportLayer;

    constructor(tl: TransportLayer) {
        this.transportLayer = tl;
        setInterval(this.update.bind(this), 2000);
    }

    update = () => {
        this.transportLayer.getRadioData()
            .then(d => {
                console.log(d);
                return d;
            }).then(d => {
                this.songs = d.songs;
                this.shows = d.shows;
            })    }
}