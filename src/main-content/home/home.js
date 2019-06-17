import React,{Component} from 'react';
import Aux from './../../hoc/auxy';
import styles from  './home.module.css';
import * as firebase from 'firebase/app';
import AuthenticationContext from './../../context/auth-context';
import firebaseService from './../../services/firebase';


export default class Home extends Component{
  
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }   

    render(){
        return (
            <AuthenticationContext.Consumer>
                {
                    (context) => {
                        console.log('context is');
                        console.log(context);
                        return (
                            <Aux>
                                <div className={`description ${styles.fiftyWHL}`}>
                                    { context ? context.authenticated ?
                                    <button onClick={() => this.logout(context)  }>Logout</button> :
                                    <button onClick={() => this.login(context)}>Logins</button>
                                    : null
                                    }
                                </div>
                                <div className={`actions ${styles.fiftyWHR} ${styles.floatRight}`}>
                                    <div className={styles.actionsContainer}>
                                        <button tabIndex="1" className={styles.actionsBtn} onClick={this.learn}>LEARN</button>
                                        <button tabIndex="2" className={styles.actionsBtn} onClick={this.practice}>PRACTICE</button>
                                    </div>
                                </div> 
                            </Aux>
                        )  
                    } 
                }
            </AuthenticationContext.Consumer>
        )
    }

    learn = () => {
        this.props.history.push('/learn');
    }

    practice =() => {
        this.props.history.push('/practice');
    }

    login = (context) => {
        firebaseService.userLogin(context)
    }

    logout = (context) => {
        firebaseService.userLogout(context);
    }
}