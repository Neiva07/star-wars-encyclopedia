import React, { Component } from 'react';
import MainPage from './screens/MainPage';
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
