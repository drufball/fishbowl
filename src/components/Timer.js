import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    // Bind member functions
    this.incrementTime = this.incrementTime.bind(this);

    this.state = {
      elapsedTime: 0
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.incrementTime, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  incrementTime() {
    const elapsedTime = this.state.elapsedTime + 1;
    this.setState({elapsedTime: elapsedTime});

    if(this.props.duration === elapsedTime) {
      clearInterval(this.timerInterval);
      this.props.endTurn();
    }
  }

  render() {
    return (
      <div className="timer">
        {this.props.duration - this.state.elapsedTime}
      </div>
    )
  }
}

Timer.propTypes = {
  duration: React.PropTypes.number.isRequired,
  endTurn: React.PropTypes.func.isRequired
}

export default Timer;
