import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import components
import StartGameForm from './components/StartGameForm';
import GamePage from './components/GamePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={StartGameForm} />
          <Match pattern="/game/:gameId" component={GamePage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
