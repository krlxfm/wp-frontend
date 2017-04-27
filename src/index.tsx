import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PostStore } from './stores/posts';
import { UserStore } from './stores/users';
import { RadioStore }  from './stores/radio';

import { App } from './components/App';
import { Blog } from './components/Blog'
import { RadioPlayer } from './components/RadioPlayer';

import restAPI from './api';

declare function require(s: string): any;
require('./styles/list.scss');

const userStore = new UserStore(restAPI);
const postStore = new PostStore(restAPI, userStore);
const radioStore = new RadioStore(restAPI);

ReactDOM.render(
    <Provider userStore = {userStore} 
              postStore = {postStore} 
              radioStore = {radioStore}>
        <Router>
            <div>
                <RadioPlayer/>
                <Route exact path='/' component={App}/>
                <Route path='/blog/:id'component={Blog}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('react-root')
);