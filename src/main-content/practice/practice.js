import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Home from './../learn/home';
import PracticeContainer from './practice-container/practice-container';


export default class Practice extends Component{
    render(){
        return (
            <Switch>
                <Route path={this.props.match.url+'/:id'} exact component={PracticeContainer} />
                <Route path={this.props.match.url+'/'} exact component={Home} />
                <Redirect to={this.props.match.url+'/'} />
            </Switch>
        )
    }
}