import React from 'react';

// Import elements
import Timer from './Timer';

class TurnPage extends React.Component {
  render() {
    return (
      <div className="turn-page">
        <Timer duration={60} endTurn={this.props.endTurn} />
        <p>{this.props.details.currentWord}</p>
        <button className="skip" onClick={this.props.skipWord}>✘ Skip</button>
        <button className="correct" onClick={this.props.correctWord}>✓ Correct</button>
      </div>
    )
  }
}

TurnPage.propTypes = {
  details: React.PropTypes.object.isRequired,
  endTurn: React.PropTypes.func.isRequired,
  skipWord: React.PropTypes.func.isRequired,
  correctWord: React.PropTypes.func.isRequired
}

export default TurnPage;
