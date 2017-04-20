import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observer } from 'mobx-react';
import { PostStore, PostModel } from './stores/posts';

import restAPI from './api';

const PostLi = (post: PostModel) => (
    <li key={post.id}>{post.title} {post.author_id}</li>
);

@observer
class PostList extends React.Component<{postStore: PostStore}, {}> {
    render() {
        let posts = this.props.postStore.posts;
        console.log(posts[0]);
        return (
            <ul> {...posts.map(PostLi)} </ul>
        );
     }
};

const posts = new PostStore(restAPI);

ReactDOM.render(<PostList postStore={posts} />, document.getElementById('react-root'));