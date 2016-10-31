import React from 'react';

class AddWordsForm extends React.Component {
  constructor() {
    super()

    // Bind member functions
    this.addWord = this.addWord.bind(this);
  }

  addWord(event) {
    event.preventDefault();
    this.props.proposeWord(this.proposedWord.value);
    this.wordForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.wordForm = input}
            className="add-words-form">
        <input ref={(input) => this.proposedWord = input}
               type="text"
               placeholder="Add a new word" />
        <button type="submit" onClick={this.addWord}>+ Add word</button>
      </form>
    )
  }
}

AddWordsForm.propTypes = {
  proposeWord: React.PropTypes.func.isRequired
}

export default AddWordsForm;
