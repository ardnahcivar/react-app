import React from 'react';

import firebase from './../assets/firebase';

const AuthenticationContext = React.createContext({
    firebase: firebase,
    authenticated:false,
    user:null,
    setAuthState :() =>{}
})

export default AuthenticationContext;