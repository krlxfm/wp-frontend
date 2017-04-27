import * as React from 'react';

import { RouteComponentProps } from 'react-router';

import { PostStore } from '../stores/posts';
import { inject, observer } from 'mobx-react';

namespace Blog {
    export interface Props extends RouteComponentProps<{id: number}> {
        postStore?: PostStore
   } 
   
   export interface State { }
}

@inject('postStore')
@observer
export class Blog extends React.Component<Blog.Props, Blog.State> {
    render() {
        const id = this.props.match.params.id;
        const currPost = this.props.postStore.getPost(id);
        const content = { __html : currPost ? currPost.content : '' }
        return <div className = "content" dangerouslySetInnerHTML = {content}></div>
    }
}