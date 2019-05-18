import React from 'react';
import {Route,Switch,Redirect } from 'react-router-dom';
import  Detail  from  './detail/detail';
import Home from './home';

const Learn  = (props) => {   
    return (
        <Switch>
            <Route path={props.match.url+'/:id'} exact component={Detail} />
            <Route path={props.match.url+'/'} exact component={Home} />
            <Redirect to={props.match.url+'/'} />
        </Switch>
    )
}

export default Learn;