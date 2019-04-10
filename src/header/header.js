import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './header.css';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <header>
                <h1>it is a header</h1>
            </header>
        )
    }
}


export default Header;