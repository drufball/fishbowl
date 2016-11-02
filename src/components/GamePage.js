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
    this.endTurn = this.endTurn.bind(this);
    this.getNextWord = this.getNextWord.bind(this);
    this.skipWord = this.skipWord.bind(this);
    this.correctWord = this.correctWord.bind(this);

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
    this.redScoreBase = base.syncState(
      `${this.props.params.gameId}/redScore`,
      {
        context: this,
        state: 'redScore'
      }
    );
    this.blueScoreBase = base.syncState(
      `${this.props.params.gameId}/blueScore`,
      {
        context: this,
        state: 'blueScore'
      }
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.wordsRemainingBase);
    base.removeBinding(this.finishedWordsBase);
    base.removeBinding(this.currentWordBase);
    base.removeBinding(this.currentTeamBase);
    base.removeBinding(this.roundInProgressBase);
    base.removeBinding(this.redScoreBase);
    base.removeBinding(this.blueScoreBase);
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

  endTurn() {
    this.setState({
      roundInProgress: false,
      currentTeam: this.state.currentTeam == 'red' ? 'blue' : 'red'
    });
    this.context.router.transitionTo(`${this.props.pathname}/play`);
  }

  skipWord() {
    this.getNextWord(true);
  }
  correctWord() {
    const newScore = this.state[`${this.state.currentTeam}Score`] + 1;
    const finishedWords = [...this.state.finishedWords, this.state.currentWord];
    if( this.state.currentTeam == 'red' ) {
      this.setState({
        redScore: newScore,
        finishedWords: finishedWords
      });
    }
    else {
      this.setState({
        blueScore: newScore,
        finishedWords: finishedWords
      });
    }
    this.getNextWord();
  }
  getNextWord(replace = false) {
    if(this.state.wordsRemaining.length == 0) {
      this.setState({
        wordsRemaining: this.state.finishedWords,
        finishedWords: []
      })
      this.endTurn();
      return;
    }
    const wordIndex = Math.floor( Math.random() * this.state.wordsRemaining.length );
    const wordsBefore = this.state.wordsRemaining.slice(0, wordIndex);
    const wordsAfter = this.state.wordsRemaining.slice(wordIndex + 1, this.state.wordsRemaining.length);
    if(!replace) {
      this.setState({
        currentWord: this.state.wordsRemaining[wordIndex],
        wordsRemaining: [...wordsBefore, ...wordsAfter]
      });
    }
    else {
      this.setState({
        currentWord: this.state.wordsRemaining[wordIndex],
        wordsRemaining: [...wordsBefore, ...wordsAfter, this.state.currentWord]
      });
    }
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
               render={() => <TurnPage details={this.state}
                                       endTurn={this.endTurn}
                                       skipWord={this.skipWord}
                                       correctWord={this.correctWord} />} />
      </div>
    )
  }
}

GamePage.contextTypes = {
  router: React.PropTypes.object
}

export default GamePage;
