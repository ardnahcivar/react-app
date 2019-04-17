import React,{Component} from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';
import  './main.css';
import Home from './home/home';
import Detail from './detail/detail';

export default class Main extends Component{
  
    render(){
        return (
            <main>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/:id" exact component={Detail}/>
                    <Redirect from="/" to="/home" />
                </Switch>
            </main>
        )
    }
}

