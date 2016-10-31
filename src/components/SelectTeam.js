import React from 'react';

class SelectTeam extends React.Component {
  render() {
    return (
      <div className="select-team">
        <h1>Pick your team:</h1>
        <div className="red-team"
             onClick={(event) => this.props.selectTeam("red")}
        >
          Red Team
        </div>
        <div className="or-separator">- or -</div>
        <div className="blue-team"
             onClick={(event) => this.props.selectTeam("blue")}
        >
          Blue Team
        </div>
      </div>
    )
  }
}

SelectTeam.propTypes = {
  selectTeam: React.PropTypes.func.isRequired
}

export default SelectTeam;
