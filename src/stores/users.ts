import { observable } from 'mobx';

interface TransportLayer {
    getUsers: () => Promise<UserJSON[]>
}

export interface UserJSON {
    id: number;
    name: string;
    slug: string;
}

export class UserModel {
    id: number;
    name: string;
    slug: string;
    store: UserStore;

    constructor(props: UserJSON, store: UserStore) {
        this.id = props.id;
        this.name = props.name;
        this.slug = props.slug;
        this.store = store;
    }
}

export class UserStore {
    @observable users: UserModel[] = [];
    transportLayer: TransportLayer;

    constructor(tl: TransportLayer) {
        this.transportLayer = tl;
        this.loadUsers();
    }

    loadUsers = () => {
        this.transportLayer.getUsers()
            .then(u => u.forEach(x => {this.updateUsers(x)}));
    }

    public updateUsers(update: UserJSON) {
        let post = this.users.find(p => p.id == update.id);
        if (post) {
            Object.assign(post, update);
        } else {
            this.users.push(new UserModel(update, this));
        }
    }

    public find(id: number) {
        return this.users.find(u => u.id == id);
    }
}
