import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import Master from './page/Master';
import Home from './page/home/Home';
import Article from './page/content/Article';
import InfoList from './page/content/InfoList';
import Editor from './page/content/Editor';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Master}>
            <Route path="/home" component={Home}>
                <Route path="/home/blog/:articleId" component={Article}/>
                <Route path="/home/editor" component={Editor}/>
            </Route>
            <Route path="/joke" component={InfoList}/>
        </Route>
    </Router>
), document.getElementById('container'));
