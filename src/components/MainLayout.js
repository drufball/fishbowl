import React from 'react';
import { Match } from 'react-router';

// Import components
import StartGameForm from './StartGameForm';
import GamePage from './GamePage';
import Header from './Header'

class MainLayout extends React.Component {
  render() {
    return (
      <div className="main-layout">
        <Header title="Fishbowl" />
        <Match exactly pattern="/" component={StartGameForm} />
        <Match pattern="/game/:gameId" component={GamePage} />
      </div>
    )
  }
}

export default MainLayout;
