import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from './header/header';
import Main from './main-content/main';
import Aux from './hoc/auxy';
import Offline from './components/offline/offline';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Offline />
          <Header />
          <Main />
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;