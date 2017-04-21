import * as React from 'react';
import {observer} from 'mobx-react'

import { RadioStore } from '../stores/radio';
import { PostStore } from '../stores/posts';

import { PostList } from './PostList';
import { RadioHistory } from './RadioHistory';

interface Props {
    radioStore: RadioStore;
    postStore: PostStore;
};

@observer
export class App extends React.Component<Props, {}> {
    render() {
        return (
            <div> 
                <PostList postStore={this.props.postStore}/>
                <RadioHistory radioStore={this.props.radioStore}/>
            </div>
        )
    }
}