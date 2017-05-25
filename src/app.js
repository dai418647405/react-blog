import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import Master from './page/Master';
import Home from './page/home/Home';
import Article from './page/content/Article';
import InfoList from './page/content/InfoList';
import Editor from './page/content/Editor';
import PostList from './page/content/PostList';
import BlogEditForm from './page/content/BlogEditForm';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Master}>
            <Route path="/home" component={Home}>
                <Route path="/home/blog/:articleId" component={Article}/>
                <Route path="/home/editor" component={Editor}/>
            </Route>
            <Route path="/joke" component={InfoList}/>
            <Route path='/post' component={PostList}/>
            <Route path='/gajlgjaJLGJALlkjajljagajJRTRTQAgzjl' component={BlogEditForm}/>
        </Route>
    </Router>
), document.getElementById('container'));
