import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './header.module.css';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <header>
                <a href="/ ">Home</a>
            </header>
        )
    }
}


export default Header;