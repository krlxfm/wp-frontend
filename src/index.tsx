import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import {getPosts, Post} from './api';

class Posts {
    @observable data: Post[] = [];

    constructor() {
        getPosts().then(p => this.data = p);
    }
}

const PostLi = (post: Post) => {
    return <li key={post.id}>{post.title} {post.date}</li>
}

@observer
class PostsView extends React.Component<{posts: Posts}, {}> {
    render() {
        let posts = this.props.posts.data
        return (
            <ul> {...posts.map(PostLi)} </ul>
        );
     }
};

const posts =  new Posts();
ReactDOM.render(<PostsView posts={posts} />, document.getElementById('react-root'));