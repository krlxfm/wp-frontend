import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observer } from 'mobx-react';
import { PostStore } from './stores/posts';
import { UserStore } from './stores/users';

import { PostList } from './components/PostList';

import restAPI from './api';

const userStore = new UserStore(restAPI);
const postStore = new PostStore(restAPI, userStore);

ReactDOM.render(<PostList postStore={postStore}/>, document.getElementById('react-root'));