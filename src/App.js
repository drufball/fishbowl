import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Match } from 'react-router';

// Import components
import MainLayout from './components/MainLayout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Match pattern="/" component={MainLayout} />
      </BrowserRouter>
    );
  }
}

export default App;
