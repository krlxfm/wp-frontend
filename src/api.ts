import 'whatwg-fetch';
import * as he from 'he';

class restAPI {
    static BASE = 'wp-json/wp/v2/';

    protected get(resource: string, per_page = 10) {
        let endpoint = `${restAPI.BASE}${resource}?per_page=${per_page}`;
        return fetch(endpoint).then(r => r.json())
    }

    getPosts() {
        return this.get('posts', 30)
            .then(r => r instanceof Array ?
                r.map(p => ({
                    title: he.decode(p.title.rendered),
                    id: p.id,
                    content: he.decode(p.content.rendered),
                    date: p.date,
                    author_id: p.author
                })) : []
            )
    }

    getUsers() {
        return this.get('users', 50)
            .then(r => r instanceof Array ?
                r.map(p => ({
                    id: p.id,
                    slug: p.slug,
                    name: p.name,
                })) : []
            )
    }

    getRadioData() {
        return fetch('data.php')
            .then(r => r.json())
            .then(r => ({
                songs: r.songs,
                shows: [r.now, ...r.next]
            }))
    }
}

const api = new restAPI();

export default api;