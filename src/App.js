import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Main from './main-content/main';
import Aux from './hoc/auxy';
import Offline from './components/offline/offline';
import AuthenticationContext from './context/auth-context';
import firebase from './assets/firebase';
import firebaseQueries from './services/firebase';
import {ToastProvider} from 'react-toast-notifications';


export default class App extends Component {

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
          firebaseQueries.userExists(user)
          .then(querySnapshot => {
            if(querySnapshot.docs.length > 0){
              console.log(querySnapshot.docs[0].data())
              this.setAuthState({id:querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()},true)
            }else{
              firebaseQueries.createUser(user)
              .then(querySnapshot =>  {
                this.setAuthState({
                  email:user.email,
                  name:user.displayName,
                  id:querySnapshot.id
                },true);
              })
              .catch(err => {
                console.error('failed in creating user in db'+err)
              })
            }
          })
          .catch(err => {
            console.error('failed in checking user exists in db'+err)
          })
      }else{
        this.setAuthState(null,false);
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
      <ToastProvider placement='bottom-center'>
      <AuthenticationContext.Provider value={this.state}>
        <BrowserRouter>
          <Aux>
            <Offline />
            <Header />
            <Main />
          </Aux>
        </BrowserRouter>
        <div id="snackbar"></div>
      </AuthenticationContext.Provider>
      </ToastProvider>
    );
  }

  setAuthState = (user,authenticated) => {
    this.setState({
      firebase:firebase,
      authenticated:authenticated,
      user:user,
      setAuthState:this.authStateTogle
    })
  }
}
