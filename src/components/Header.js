import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <span className="title">{this.props.title}</span>
      </div>
    )
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Header;
