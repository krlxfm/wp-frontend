import { observable } from 'mobx';

interface TransportLayer {
    getUsers: () => Promise<UserJSON[]>
}

export interface UserJSON {
    id: number;
    name?: string;
    slug?: string;
}

export class UserModel {
    id: number;
    @observable name: string;
    @observable slug: string;

    store: UserStore;

    constructor(id: number, store: UserStore) {
        this.id = id;
        this.store = store;
    }

    update(json: UserJSON) {
        if (json.id != this.id) return;

        this.slug = json.slug;
        this.name = json.name;
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
        let user = this.users.find(u => u.id == update.id);
        if (!user) {
            user = this.create(update.id);
        }

        user.update(update);
    }

    public find(id: number) {
        return this.users.find(u => u.id == id);
    }

    public create(id: number) {
        let user = new UserModel(id, this);
        this.users.push(user);
        return user;
    }
}
