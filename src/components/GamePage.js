import React from 'react';
import base from '../base';

class GamePage extends React.Component {
  constructor() {
    super()

    // Bind member functions

    // Initialize state
    this.state = {
      words: [],
      roundPositions: [0, 0, 0]
    }
  }

  componentWillMount() {
    console.log("Connecting to firebase");
    this.wordsBase = base.syncState(
      `${this.props.params.gameId}/words`,
      {
        context: this,
        state: 'words'
      }
    );
    this.roundPositionsBase = base.syncState(
      `${this.props.params.gameId}/roundPositions`,
      {
        context: this,
        state: 'roundPositions'
      }
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.wordsBase);
    base.removeBinding(this.roundPositionsBase);
  }

  render() {
    return (
      <div>GamePage</div>
    )
  }
}

export default GamePage;
