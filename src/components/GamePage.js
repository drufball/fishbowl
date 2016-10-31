import React from 'react';
import { Match } from 'react-router';
import base from '../base';

// Import components
import AddWordsForm from './AddWordsForm';

class GamePage extends React.Component {
  constructor() {
    super()

    // Bind member functions

    // Initialize state
    this.state = {
      wordsRemaining: [],
      finishedWords: [],
      username: '',
      team: '',
      currentTeam: '',
      currentWord: '',
      roundInProgress: false,
      redScore: 0,
      blueScore: 0
    }
  }

  componentWillMount() {
    this.wordsRemainingBase = base.syncState(
      `${this.props.params.gameId}/wordsRemaining`,
      {
        context: this,
        state: 'wordsRemaining'
      }
    );
    this.finishedWordsBase = base.syncState(
      `${this.props.params.gameId}/finishedWords`,
      {
        context: this,
        state: 'finishedWords'
      }
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.wordsRemainingBase);
    base.removeBinding(this.finishedWordsBase);
  }

  render() {
    return (
      <div className="game-page">
        <Match pattern={`${this.props.pathname}/add-words`}
               component={AddWordsForm} />
      </div>
    )
  }
}

export default GamePage;
