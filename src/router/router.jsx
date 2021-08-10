import React from 'react';
import Home from '../home';
import Service from '../components/service/service';
import MyserviceList from '../components/account/myservicelist';
import Myservice from '../components/account/myservice';
import Usage from '../components/account/usage';

import {HashRouter as Router, Route, Switch} from "react-router-dom";

function routerlink() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/service/:id" component={Service}/>
                <Route path="/myservicelist" component={MyserviceList}/>
                <Route path="/myservice/:id" component={Myservice}/>
                <Route path="/usage" component={Usage}/>
            </Switch>
        </Router>);
}
export default routerlink;
