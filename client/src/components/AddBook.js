import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  displayAuthors() {
    let data = this.props.data;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    }
    return data.authors.map(author => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  submitFrom(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.submitFrom.bind(this)}>
          <div className="field">
            <label>Book name:</label>
            <input
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
            />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              onChange={e => this.setState({ genre: e.target.value })}
              type="text"
            />
          </div>
          <div className="field">
            <label>Author:</label>
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
