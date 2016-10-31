import React from 'react';
import { Match } from 'react-router';
import base from '../base';

// Import components
import AddWordsPage from './AddWordsPage';
import SelectTeam from './SelectTeam';

class GamePage extends React.Component {
  constructor() {
    super()

    // Bind member functions
    this.addWords = this.addWords.bind(this);
    this.selectTeam = this.selectTeam.bind(this);

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

  addWords(wordsToAdd) {
    const wordsRemaining = [...this.state.wordsRemaining, ...wordsToAdd];
    this.setState({ wordsRemaining: wordsRemaining });
    this.context.router.transitionTo(`${this.props.pathname}/select-team`);
  }

  selectTeam(team) {
    this.setState({ team: team });
    this.context.router.transitionTo(`${this.props.pathname}/select-username`);
  }

  render() {
    return (
      <div className="game-page">
        <Match pattern={`${this.props.pathname}/add-words`}
               render={() => <AddWordsPage addWords={this.addWords} />} />
        <Match pattern={`${this.props.pathname}/select-team`}
               render={() => <SelectTeam selectTeam={this.selectTeam} />} />
      </div>
    )
  }
}

GamePage.contextTypes = {
  router: React.PropTypes.object
}

export default GamePage;
