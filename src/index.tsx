import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observer } from 'mobx-react';
import { PostStore } from './stores/posts';
import { UserStore } from './stores/users';
import { RadioStore }  from './stores/radio';

import { App } from './components/App';

import restAPI from './api';

declare function require(s: string): any;
require('./styles/list.scss');

const userStore = new UserStore(restAPI);
const postStore = new PostStore(restAPI, userStore);
const radioStore = new RadioStore(restAPI);

ReactDOM.render(
    <App postStore={postStore} radioStore={radioStore}/>, 
    document.getElementById('react-root')
);