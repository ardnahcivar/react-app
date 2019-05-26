import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './header.module.css';
import SettingsIcon  from 'react-icons/lib/md/settings';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <header>
                <a href="/ ">Home</a>
        
                <div className={styles.settingsIcon}>
                    <SettingsIcon />
                </div>
            </header>
        )
    }
}


export default Header;