import React, { Component } from 'react';
import './App.css';
import MainPage from './MainPage';
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <MainPage />        
      </Router> 
    );
  }
}

export default App;
