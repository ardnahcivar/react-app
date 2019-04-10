import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header/header';
import Main from './main-content/main';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <h1>HEY</h1>
      </div>
    );
  }
}

export default App;