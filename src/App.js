import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Header from './header/header';
import Main from './main-content/main';
import Aux from './hoc/auxy';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Header />
          <Main />
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;