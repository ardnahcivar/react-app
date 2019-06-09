import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Main from './main-content/main';
import Aux from './hoc/auxy';
import Offline from './components/offline/offline';
import AuthenticationContext from './context/auth-context';
import firebase from './assets/firebase';

class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
          this.setState({
            firebase:firebase,
            authenticated:true,
            user:user,
            setAuthState:this.authStateTogle
          })
      }else{
          this.setState({
            firebase:firebase,
            authenticated:false,
            user:null,
            setAuthState:this.authStateTogle
          })
      }
    }) 
  }

  authStateTogle = (state) => {
    this.setState({
      ...this.state,
      authenticated:state
    })
  }

  render() {
    return (
      <AuthenticationContext.Provider value={this.state}>
        <BrowserRouter>
          <Aux>
            <Offline />
            <Header />
            <Main />
          </Aux>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    );
  }
}

export default App;