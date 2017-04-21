import * as React from 'react';
import { observer } from 'mobx-react';
import { PostModel, PostStore } from '../stores/posts';

const PostLi = (post: PostModel) => (
    <li key={post.id} className='post'>
        <span className='title'> {post.title} </span> by
        <span className='author'> {post.author ? post.author.name : 'none'} </span> 
    </li>
);

@observer
export class PostList extends React.Component<{postStore: PostStore}, {}> {
    render() {
        let posts = this.props.postStore.posts;
        return (
            <div>
                Posts
                <ul> {...posts.map(PostLi)} </ul>
            </div>
        );
     }
};
