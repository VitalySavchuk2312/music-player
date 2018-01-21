import React, {Component} from 'react';
import styles from '../includes/css/app.css';

export default class Search extends Component {
  render() {
    return(
      <section className="search-container">
        <input type="text" className="search-container__input" placeholder="Search for artists or tracks" onChange={this.typeSongName.bind(this)} />
      </section>
    );
  }
  typeSongName(e) {
    this.props.findSongInTheList(e.target.value);
  }
}
