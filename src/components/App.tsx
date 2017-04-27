import * as React from 'react';
import { observer, inject } from 'mobx-react'

import { RadioStore } from '../stores/radio';
import { PostStore } from '../stores/posts';

import { PostList } from './PostList';
import { RadioHistory } from './RadioHistory';

import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<void> {
    radioStore?: RadioStore;
    postStore?: PostStore;
};

@inject('postStore', 'radioStore')
@observer
export class App extends React.Component<Props, {}> {
    render() {
        return (
            <div className="section"> 
                <PostList postStore={this.props.postStore}/>
                <RadioHistory radioStore={this.props.radioStore}/>
            </div>
        )
    }
}