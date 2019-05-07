import React from 'react';
import Aux  from  './../../hoc/aux';
import styles from './login.module.css';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }

    componentDidMount(){

    }

    render(){
        return (
            <Aux>
                <p>LOGIN</p>
                <form className={styles.loginForm}>
                    <input type="text" value={this.state.username} onChange={(e) => this.setState({...this.state,username:e.target.value})} placeholder="Enter the Username" />
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({...this.state,password:e.target.value})} placeholder="Enter the Password"/>
                    <button type="button" onClick={this.onSubmit}>Submit</button>
                </form>
            </Aux>
        )
    }

    onSubmit = () => {
        console.log('submit pressed');
        console.log(this.state);
    }

    clearLoginForm = () => {
        this.setState({
            username:'',
            password:''
        })
    }
} 