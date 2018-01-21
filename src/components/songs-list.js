import React, {Component} from 'react';
import styles from '../includes/css/app.css';

export default class SongsList extends Component {
  render() {
    const songsList = this.props.list.map((item, index) => {
      item.audio.addEventListener('loadedmetadata', () => {
        this.handleSongDuration(item.audio.duration, index);
      });
      // if this is an active item, render with some additional styles
      if(item.active == true) {
        return(
          <li key={index} className="songs-list__item songs-list__item-selected">
            <span className="songs-list__item-name" onClick={this.chooseSong.bind(this)}>{item.name}</span>
            <span className="songs-list__item-duration">{item.duration}</span>
          </li>
        ) // render others items
      } else {
        return(
          <li key={index} className="songs-list__item">
          <span className="songs-list__item-name" onClick={this.chooseSong.bind(this)}>{item.name}</span>
          <span className="songs-list__item-duration">{item.duration}</span>
          </li>
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
    // sending chosen song properties to parent component
    this.props.pickSongFromList(e.target.innerHTML);
    this.props.changeActiveSong(e.target.innerHTML);
  }

  handleSongDuration(item, index) {
    this.props.setSongDuration(item, index);
  }
}
