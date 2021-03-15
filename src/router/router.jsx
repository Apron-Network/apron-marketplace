import React from 'react';
import Home from '../home';
import Service from '../components/service/service';
import Account from '../components/account/Account';
import Myprovider from '../components/account/myprovider';

import {HashRouter as Router, Route, Switch} from "react-router-dom";

function routerlink() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/service/:id" component={Service}/>
                <Route path="/account" component={Account}/>
                <Route path="/myprovider" component={Myprovider}/>
            </Switch>
        </Router>);
}
export default routerlink;
