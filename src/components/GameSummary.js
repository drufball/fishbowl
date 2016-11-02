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
        turnDetail = <button onClick={this.props.startTurn}>
                       Start turn →
                     </button>;
      }
    }
    else {
      if( details.roundInProgress ) {
        turnDetail = <div>
                       <p>The other team is guessing:</p>
                       <p><strong>{details.currentWord}</strong></p>
                     </div>;
      }
      else {
        turnDetail = <div>It's the other team's turn!</div>;
      }
    }
    return (
      <div className="game-summary">
        <div className="scores">
          <div className="red-score">
            <h1>Red Team</h1>
            <div>{details.redScore}</div>
          </div>
          <div className="blue-score">
            <h1>Blue Team</h1>
            <div>{details.blueScore}</div>
          </div>
        </div>
        <h1 className="round-type">{details.roundType}</h1>
        {turnDetail}
      </div>
    )
  }
}

GameSummary.propTypes = {
  details: React.PropTypes.object.isRequired,
  startTurn: React.PropTypes.func.isRequired
}

export default GameSummary;
