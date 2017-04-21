import { observable } from 'mobx';
import { UserModel, UserStore } from './users';

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
    author: UserModel;
    title: string;
    date: Date;
    content: string;
    store: PostStore;

    constructor(props: PostJSON, author: UserModel, store: PostStore) {
        this.id = props.id;
        this.author = author;
        this.content = props.content;
        this.title = props.title;
        this.date = new Date(props.date);
        this.store = store;
    }
}

export class PostStore {
    @observable posts: PostModel[] = [];
    transportLayer: TransportLayer;
    userStore: UserStore;

    constructor(tl: TransportLayer, us: UserStore) {
        this.transportLayer = tl;
        this.userStore = us;
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
            post.content = update.content;
            post.title = update.title;
        } else {
            let author = this.userStore.find(update.author_id);
            if (!author) {
                author = this.userStore.create(update.author_id);
            }

            this.posts.push(new PostModel(update, author, this));
        }
    }

}

