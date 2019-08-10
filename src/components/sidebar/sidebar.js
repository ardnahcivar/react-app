import React,{Component} from 'react'
import MenuIcon from 'react-icons/lib/md/menu';
import CloseIcon from 'react-icons/lib/md/close';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import Settings from './../../components/appSettings/settings';

export default class SideBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            open:this.props.open | false,
        }
    }

    render(){
        // debugger
        console.log(`sidebar stateuis ${this.state.user}`)
        if(this.state.open){
            return(
                <div className={styles.sideBar}>
                    <div className={styles.actions}>
                        <div className={styles.close} onClick={this.toggleSidebar}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className={styles.profile}>
                        <p>hey</p>
                        <p>
                            {this.props.user && this.props.user.user && this.props.user.user.name}
                        </p>
                        {
                            ( this.props.user && this.props.user.authenticated) ?
                            <button className={styles.logout} onClick={() => {this.toggleSidebar();this.props.logout(this.props.user)}}> Logout</button>
                            :
                            <button className={styles.login} onClick={() => {this.toggleSidebar();this.props.login(this.props.user)}}>Login </button>
                        }
                    </div>
                    <div className={styles.listItems}>
                        <ul>
                            <li onClick={this.toggleSidebar}><Link to="/">Home</Link></li>
                            <li>About</li>
                            <li onClick={this.toggleSettings}>Settings</li>
                        </ul>
                    </div>
                </div>
            )
        }else return(
            <div onClick={this.toggleSidebar} className={styles.hamIcon}>
                <MenuIcon />
            </div>
        );
    }

    toggleSidebar = () => {
        this.setState({
            ...this.state,
            open:!this.state.open
        })
    }

    toggleSettings = () => {
        this.toggleSidebar();
        this.props.settings();
    }
}