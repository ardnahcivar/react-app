import React from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';
import  './main.css';
import Home from './home/home';
import Learn from './learn/learn';
import Practice from './practice/practice';

const Main  = (props) => {  
        return (
            <main>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/learn" component={Learn} />
                    <Route path="/practice" component={Practice} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </main>
        )
}

export default Main;