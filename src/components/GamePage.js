import React from 'react';
import { Match } from 'react-router';
import base from '../base';

// Import components
import AddWordsPage from './AddWordsPage';
import SelectTeam from './SelectTeam';
import GameSummary from './GameSummary';
import TurnPage from './TurnPage';

class GamePage extends React.Component {
  constructor() {
    super()

    // Bind member functions
    this.addWords = this.addWords.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.startTurn = this.startTurn.bind(this);

    // Initialize state
    this.state = {
      wordsRemaining: [],
      finishedWords: [],
      username: '',
      team: 'red',
      roundType: 'Free for all',
      currentTeam: 'red',
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
    this.currentWordBase = base.syncState(
      `${this.props.params.gameId}/currentWord`,
      {
        context: this,
        state: 'currentWord'
      }
    );
    this.currentTeamBase = base.syncState(
      `${this.props.params.gameId}/currentTeam`,
      {
        context: this,
        state: 'currentTeam'
      }
    );
    this.roundInProgressBase = base.syncState(
      `${this.props.params.gameId}/roundInProgress`,
      {
        context: this,
        state: 'roundInProgress'
      }
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.wordsRemainingBase);
    base.removeBinding(this.finishedWordsBase);
    base.removeBinding(this.currentWordBase);
    base.removeBinding(this.currentTeamBase);
    base.removeBinding(this.roundInProgressBase);
  }

  addWords(wordsToAdd) {
    const wordsRemaining = [...this.state.wordsRemaining, ...wordsToAdd];
    this.setState({ wordsRemaining: wordsRemaining });
    this.context.router.transitionTo(`${this.props.pathname}/select-team`);
  }

  selectTeam(team) {
    this.setState({ team: team });
    this.context.router.transitionTo(`${this.props.pathname}/play`);
  }

  startTurn() {
    this.setState({ roundInProgress: true });
    this.context.router.transitionTo(`${this.props.pathname}/turn`);
  }

  render() {
    return (
      <div className="game-page">
        <Match pattern={`${this.props.pathname}/add-words`}
               render={() => <AddWordsPage addWords={this.addWords} />} />
        <Match pattern={`${this.props.pathname}/select-team`}
               render={() => <SelectTeam selectTeam={this.selectTeam} />} />
        <Match pattern={`${this.props.pathname}/play`}
               render={() => <GameSummary details={this.state}
                                          startTurn={this.startTurn} />} />
        <Match pattern={`${this.props.pathname}/turn`}
               render={() => <TurnPage details={this.state} />} />
      </div>
    )
  }
}

GamePage.contextTypes = {
  router: React.PropTypes.object
}

export default GamePage;
