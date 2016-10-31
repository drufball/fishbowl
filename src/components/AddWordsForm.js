import React from 'react';

class AddWordsForm extends React.Component {
  render() {
    return (
      <div className="add-words-form">
        <form>
          <input type="text" placeholder="Add a new word" />
          <button type="submit">+ Add word</button>
        </form>
      </div>
    )
  }
}

export default AddWordsForm;
