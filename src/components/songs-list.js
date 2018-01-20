import React, {Component} from 'react';
import styles from '../includes/css/app.css';

export default class SongsList extends Component {
  render() {
    const songsList = this.props.list.map((item, index) => {
      if(item.active == true) {
        return(
          <li key={index} className="songs-list__item songs-list__item-selected" onClick={this.chooseSong.bind(this)}>{item.name}</li>
        )
      } else {
        return(
          <li key={index} className="songs-list__item" onClick={this.chooseSong.bind(this)}>{item.name}</li>
        )
      }
    })
    return(
      <section className="songs-list-container">
        <ul className="songs-list">
          {songsList}
        </ul>
      </section>
    )
  }
  chooseSong(e) {
    this.props.pickSongFromList(e.target.innerHTML);
    this.props.changeActiveSong(e.target.innerHTML);
  }
}
