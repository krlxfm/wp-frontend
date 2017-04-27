import * as React from 'react';
import { observer } from 'mobx-react';
import { PostModel, PostStore } from '../stores/posts';

import { Link } from 'react-router-dom';

declare function require(s: string): any;
require('../styles/list.scss');

const PostLi = (post: PostModel) => (
    <li key={post.id} className='post'>
        <Link to={`/blog/${post.id}`} className='title'>{post.title}</Link> by
        <span className='author'> {post.author ? post.author.name : 'none'}</span> 
    </li>
);

@observer
export class PostList extends React.Component<{postStore: PostStore}, {}> {
    render() {
        let posts = this.props.postStore.posts;
        return (
            <div className="content">
                Posts
                <ul> {...posts.map(PostLi)} </ul>
            </div>
        );
     }
};
