import React from 'react';

class StartGameForm extends React.Component {
  constructor() {
    super()

    // Bind member functions
    this.createGame = this.createGame.bind(this);
  }

  createGame(event) {
    event.preventDefault();
    const gameId = this.gameId.value;
    this.context.router.transitionTo(`/game/${gameId}`);
  }

  render() {
    return (
      <form>
        <input ref={(input) => this.gameId = input}
               type="text"
               placeholder="Example game name" />
        <button type="submit" onClick={this.createGame}>+ Create game</button>
        <input type="text" placeholder="Name of game to join" />
        <button type="submit">Join game →</button>
      </form>
    )
  }
}

StartGameForm.contextTypes = {
  router: React.PropTypes.object
}

export default StartGameForm;
