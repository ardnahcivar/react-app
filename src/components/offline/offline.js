import React from 'react';
import Aux from './../../hoc/auxy';
import styles from './offline.module.css';

export default class Offline extends React.Component{
    state = {
        onlineState:null,
        isOnLine:null,
        transition: false
    }
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.updateOnlineStatus();
        window.addEventListener('online',this.updateOnlineStatus);
        window.addEventListener('offline',this.updateOnlineStatus);
    }

    componentDidUpdate(prevProps,prevState){
        if(!prevState.isOnLine && this.state.isOnLine){
            this.triggerTransition();
        }
    }

    triggerTransition = () => {

         this.setState({
                ...this.state,
                transition: true
        },() => {
             setTimeout(() => {
                this.setState({
                    ...this.state,
                    transition: false
                })
            },10000)
        })

    }

    render(){
        const classes = [];
        classes.push(this.state.transition ? styles.online : null);
        classes.push(this.state.isOnLine ? null : styles.offline);
        if(classes[0] === null && classes[1] === null){
            classes.push(styles.none);
        }
        const toolBar = <p >{this.state.onlineState} </p>;
        return(
            <Aux>
                <div id={styles.onLineStatus} className={classes.join(' ') }>
                    { toolBar }
                </div>
            </Aux>
        )
    }

    updateOnlineStatus = () => {
        this.setState({
            ...this.state,
            onlineState : navigator.onLine ? "You are online":"No connection working offline",
            isOnLine : navigator.onLine ? true : false
        },() => {
            console.log(this.state);
        })
    }
}