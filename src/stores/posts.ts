import { observable } from 'mobx';

interface TransportLayer { 
    getPosts: () => Promise<PostJSON[]>;
}

export interface PostJSON {
    id: number;
    author_id: number;
    title: string;
    date: string;
    content: string;
}

export class PostModel {
    id: number;
    author_id: number;
    title: string;
    date: Date;
    content: string;
    store: PostStore;

    constructor(props: PostJSON, store: PostStore) {
        this.id = props.id;
        this.author_id = props.author_id;
        this.content = props.content;
        this.title = props.title;
        this.date = new Date(props.date);
        this.store = store;
    }
}

export class PostStore {
    @observable posts: PostModel[] = [];
    transportLayer: TransportLayer;

    constructor(tl: TransportLayer) {
        this.transportLayer = tl;
        this.loadPosts();
    }

    loadPosts = () => {
        this.transportLayer.getPosts()
            .then(posts => {
                posts.forEach(p => { this.updatePosts(p) });
            });
    }

    public updatePosts(update: PostJSON) {
        let post = this.posts.find(p => p.id == update.id);
        if (post) {
            Object.assign(post, update);
        } else {
            this.posts.push(new PostModel(update, this));
        }
    }

}

