import React from 'react';

class GameSummary extends React.Component {
  render() {
    const details = this.props.details;
    var turnDetail = null;
    if( details.team == details.currentTeam ) {
      if( details.roundInProgress ) {
        turnDetail = <div>Start guessing!</div>;
      }
      else {
        turnDetail = <button>Start turn</button>;
      }
    }
    else {
      if( details.roundInProgress ) {
        turnDetail = <div>{details.currentWord}</div>;
      }
      else {
        turnDetail = <div>It's the other team's turn!</div>;
      }
    }
    return (
      <div className="game-summary">
        <div className="red-score">
          <h1>Red Team:</h1>
          <div>{details.redScore}</div>
        </div>
        <div className="blue-score">
          <h1>Blue Team:</h1>
          <div>{details.blueScore}</div>
        </div>
        <h1 className="roundType">{details.roundType}</h1>
        {turnDetail}
      </div>
    )
  }
}

GameSummary.propTypes = {
  details: React.PropTypes.object.isRequired
}

export default GameSummary;
