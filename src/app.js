import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import Master from './page/Master';
import Home from './page/home/Home';
import Article from './page/content/Article';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Master}>
            <Route path="/home" component={Home}>
                <Route path="/home/blog/:articleId" component={Article}/>
            </Route>
            {/*/!*<Route path="/repos" component={Repos}>*!/*/}
        {/*/!*<Route path="/repos/:userName/:repoName" component={Repo}/>*!/*/}
    {/*/!*</Route>*!/*/}
        {/*/!*<Route path="/about" component={About}/>*!/*/}
        </Route>
    </Router>
), document.getElementById('container'));
