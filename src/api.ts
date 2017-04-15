import 'whatwg-fetch';

export interface Post {
    id: string;
    title: string;
    date: string;
    content: string;
}

export function getPosts() {
    return fetch('wp-json/wp/v2/posts')
        .then(r => r.json())
        .then(r => {
            if(r instanceof Array) {
                return r.map(p => ({
                    title: p.title.rendered,
                    id: p.id,
                    content: p.content.rendered,
                    date: p.date
                }) as Post);
            } else {
                return [];
            }
        })
        .then(posts => {
            console.log(posts);
            return posts;
        });
}