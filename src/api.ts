import 'whatwg-fetch';

class restAPI {
    static BASE = 'wp-json/wp/v2/';

    getURL = (resource: string) => `${restAPI.BASE}${resource}`;

    getPosts() {
        return fetch(this.getURL('posts'))
            .then(r => r.json())
            .then(r => r instanceof Array ?
                    r.map(p => ({
                        title: p.title.rendered,
                        id: p.id,
                        content: p.content.rendered,
                        date: p.date,
                        author_id: p.author
                    })) : []
            )
    }
}

const api = new restAPI();

export default api;