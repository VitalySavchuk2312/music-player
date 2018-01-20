import React, {Component} from 'react';
import SongsList from './songs-list';
import styles from '../includes/css/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio('../../includes/songs/imagine_dragons_demons.mp3'),
      songsDetails: [
        {
          id: 0,
          audio: new Audio('../../includes/songs/imagine_dragons_demons.mp3'),
          name: 'Imagine Dragons Demons.mp3',
          path: '../../includes/songs/imagine_dragons_demons.mp3',
          duration: this.audio,
          active: true
        },
        {
          id: 1,
          name: 'Скрябін Квінти.mp3',
          path: '../../includes/songs/скрябін_квінти.mp3',
          duration: 0,
          active: false
        },
        {
          id: 2,
          name: 'My chemical romance Fake your death.mp3',
          path: '../../includes/songs/my_chemical_romance_fake_your_death.mp3',
          duration: 0,
          active: false
        },
        {
          id: 3,
          name: 'OneRepublic Good Life.mp3',
          path: '../../includes/songs/onerepublic_good_life.mp3',
          duration: 0,
          active: false
        },
        {
          id: 4,
          name: 'Cliff Richard Somethin\' is going on.mp3',
          path: '../../includes/songs/somethin\'_is_going_on.mp3',
          duration: 0,
          active: false
        },
      ],
      playPauseIcon: '../../includes/img/play.png',
      counter: 0
    }
  }

  render() {
    return(
      // dynamic src attribute for img to change the song when user clicks the next button
      <div className="player-container">
        <img src="../../includes/img/previous.png" alt="previos" className="player-container__previous-img" onClick={this.previousSong.bind(this)} />
        <img src={this.state.playPauseIcon} alt="play" className="player-container__play-img" onClick={this.switchSong.bind(this)} />
        <img src="../../includes/img/next.png" alt="next" className="player-container__next-img" onClick={this.nextSong.bind(this)} />
        <input type="range" min="0" max="100" className="player-container__volume" onMouseMove={this.changeVolume.bind(this)}/>
        <input type="range" min="0" max="100" step="1" className="player-container__progress" onClick={this.changeProgress.bind(this)} />
        <span className="player-container__song-duration">{this.state.songsDetails.duration}</span>
        <SongsList audio={this.state.audio} list={this.state.songsDetails} pickSongFromList={this.pickSongFromList.bind(this)} changeActiveSong={this.changeActiveSong.bind(this)} />
      </div>
    );
  }

  // switch on/off sound when user clicks on/off btn
  switchSong() {
    if(this.state.audio.paused) {
      this.showElapsedTime(this.state.audio.duration);
      console.log(this.state.songsDetails.duration);
      this.state.audio.play();
      this.setState({
        playPauseIcon: '../../includes/img/pause.png'
      });
      // show progress of playing current song
      this.changeProgress();
    } else {
      this.state.audio.pause();
      this.setState({
        playPauseIcon: '../../includes/img/play.png'
      })
    }
  }

  previousSong() {
    this.showElapsedTime(this.state.audio.duration);
    // pause the previous song and start new one
    this.state.audio.pause();
    // change the button to a pause mode when sound is on
    this.setState({
      playPauseIcon: '../../includes/img/pause.png'
    });
    /* while counter is more than 0, continue execution.
       When it is 0, start from the end of list */
    if(this.state.counter > 0) {
      this.state.counter--;
      // remove higlight from the previous song
      this.state.songsDetails[this.state.counter + 1].active = false;
      // add highliht to the next song
      this.state.songsDetails[this.state.counter].active = true;
    } else {
      this.state.counter = this.state.songsDetails.length - 1;
      // if it is the first element in array, remove higlight
      this.state.songsDetails[0].active = false;
      // add higlight to the last element
      this.state.songsDetails[this.state.songsDetails.length - 1].active = true;
    }
    // change the source of previous song on the new one
    this.state.audio.src = this.state.songsDetails[this.state.counter].path;
    this.state.audio.play();
  }

  nextSong() {
    this.showElapsedTime(this.state.audio);
    // pause the previous song and start new one
    this.state.audio.pause();
    // change the button to a pause mode when sound is on
    this.setState({
      playPauseIcon: '../../includes/img/pause.png'
    });
    /* while counter is less than array of songs, continue execution.
       When it is equil, start from the beggining of list */
    if(this.state.counter < this.state.songsDetails.length - 1) {
      this.state.counter++;
      // remove higlight from the previous song
      this.state.songsDetails[this.state.counter - 1].active = false;
      // add highliht to the next song
      this.state.songsDetails[this.state.counter].active = true;
    } else {
      this.state.counter = 0;
      // if it is the last element in array, remove higlight
      this.state.songsDetails[this.state.songsDetails.length - 1].active = false;
      // add higlight to the first element
      this.state.songsDetails[this.state.counter].active = true;
    }
    // change the source of previous song on the new one
    this.state.audio.src = this.state.songsDetails[this.state.counter].path;
    // finally play the song
    this.state.audio.play();
  }

  changeVolume(e) {
    this.state.audio.volume = e.target.value / 100;
  }

  changeProgress(e) {
    this.state.audio.addEventListener('timeupdate', () => {
      const pos = this.state.audio.currentTime * (100 / this.state.audio.duration);
      document.getElementsByClassName('player-container__progress')[0].value = pos;
    });
  }

  pickSongFromList(item) {
    const chosenSong = this.state.songsDetails.filter((song, index) => {
      return song.name == item;
    });
    this.state.audio.src = chosenSong[0].path;
    // change the button to a pause mode when sound is on
    this.setState({
      playPauseIcon: '../../includes/img/pause.png'
    });
    if(this.state.counter < this.state.songsDetails.length - 1) {
      this.state.counter = chosenSong[0].id
    } else {
      this.state.counter = 0;
    }
    this.state.audio.play();
  }

  // add higlight for active song
  changeActiveSong(item) {
    const chosenSong = this.state.songsDetails.filter((song, index) => {
      this.state.songsDetails[index].active = false;
      if(song.name == item) {
        this.state.songsDetails[index].active = true;
      }
    });
  }

  showElapsedTime(item) {
    let minutes = Math.round(item / 60);
    let seconds = Math.round(item % 60);
    // add 0 in the beginning of digit, if it is less than 10
    if(minutes < 10) {
      minutes = "0" + minutes;
    }
    if(seconds < 10) {
      seconds = "0" + seconds;
    }
    // set duration indicator
    this.state.songsDetails.duration = `${minutes}:${seconds}`;
  }

}
