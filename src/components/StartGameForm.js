import React from 'react';
import base from '../base';

class StartGameForm extends React.Component {
  constructor() {
    super()
    // Bind member functions
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  createGame(event) {
    event.preventDefault();
    const gameId = this.formatGameId(this.newGameId.value);
    base.post(gameId, {
      data: {
        wordsRemaining: [],
        finishedWords: [],
        roundType: 'Free for all',
        currentTeam: 'red',
        currentWord: '',
        roundInProgress: false,
        redScore: 0,
        blueScore: 0
      }
    }).then(() => {
      this.context.router.transitionTo(`/game/${gameId}/add-words`);
    }).catch(err => {
      console.log(err);
    });

  }

  joinGame(event) {
    event.preventDefault();
    const gameId = this.formatGameId(this.oldGameId.value);
    this.context.router.transitionTo(`/game/${gameId}/add-words`);
  }

  formatGameId(gameId) {
    return gameId.split(' ').join('-');
  }

  render() {
    return (
      <form className="start-game-form">
        {/* Create a new game */}
        <input ref={(input) => this.newGameId = input}
               type="text"
               placeholder="Example game name" />
        <button type="submit" onClick={this.createGame}>+ Create game</button>

        {/* Join an existing game */}
        <input ref={(input) => this.oldGameId = input}
               type="text"
               placeholder="Name of game to join" />
        <button type="submit" onClick={this.joinGame}>Join game →</button>
      </form>
    )
  }
}

StartGameForm.contextTypes = {
  router: React.PropTypes.object
}

export default StartGameForm;
