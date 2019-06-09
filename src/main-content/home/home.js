import React,{Component} from 'react';
import Aux from './../../hoc/auxy';
import styles from  './home.module.css';
import * as firebase from 'firebase/app';
import AuthenticationContext from './../../context/auth-context';
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')


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
        context.firebase.auth().signInWithPopup(provider).then(function(result){
            console.log(result);
            context.setAuthState(true);  
        })
        .catch(function(error){
            console.error(error);
        })
    }

    logout = (context) => {
        context.firebase.auth().signOut().then((v) => {
            context.setAuthState(false);
        }).catch((error) => {
            console.log('log out failed'+error);
        })
    }
}