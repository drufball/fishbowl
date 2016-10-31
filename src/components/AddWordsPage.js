import React from 'react';

// Import components
import AddWordsForm from './AddWordsForm';

class AddWordsPage extends React.Component {
  constructor() {
    super()

    // Bind member functions
    this.proposeWord = this.proposeWord.bind(this);
    this.addWords = this.addWords.bind(this);

    this.state = {
      wordsToAdd: []
    }
  }

  proposeWord(word) {
    const wordsToAdd = [...this.state.wordsToAdd, word];
    this.setState({wordsToAdd: wordsToAdd});
  }

  addWords(event) {
    this.props.addWords(this.state.wordsToAdd);
  }

  render() {
    return (
      <div className="add-words-page">
        <AddWordsForm proposeWord={this.proposeWord}/>
        <h1>Your words</h1>
        <ul>
          {this.state.wordsToAdd.map(word => <li key={word}>{word}</li>)}
        </ul>
        <button onClick={this.addWords}>Done</button>
      </div>
    )
  }
}

AddWordsPage.propTypes = {
  addWords: React.PropTypes.func.isRequired
}

export default AddWordsPage;
