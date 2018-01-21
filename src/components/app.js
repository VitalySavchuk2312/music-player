import React, {Component} from 'react';
import SongsList from './songs-list';
import Search from './search.js';
import styles from '../includes/css/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio('../../includes/songs/imagine_dragons_demons.mp3'),
      songsDetails: [
        {
          id: 0,
          name: 'Imagine Dragons Demons.mp3',
          audio: new Audio('../../includes/songs/imagine_dragons_demons.mp3'),
          path: '../../includes/songs/imagine_dragons_demons.mp3',
          active: true
        },
        {
          id: 1,
          name: 'Скрябін Квінти.mp3',
          audio: new Audio('../../includes/songs/скрябін_квінти.mp3'),
          path: '../../includes/songs/скрябін_квінти.mp3',
          active: false
        },
        {
          id: 2,
          name: 'My chemical romance Fake your death.mp3',
          audio: new Audio('../../includes/songs/my_chemical_romance_fake_your_death.mp3'),
          path: '../../includes/songs/my_chemical_romance_fake_your_death.mp3',
          active: false
        },
        {
          id: 3,
          name: 'OneRepublic Good Life.mp3',
          audio: new Audio('../../includes/songs/onerepublic_good_life.mp3'),
          path: '../../includes/songs/onerepublic_good_life.mp3',
          active: false
        },
        {
          id: 4,
          name: 'Cliff Richard Somethin\' is going on.mp3',
          audio: new Audio('../../includes/songs/somethin\'_is_going_on.mp3'),
          path: '../../includes/songs/somethin\'_is_going_on.mp3',
          active: false
        },
      ],
      // separate array for input search adjusting
      songsDetails2: [
        {
          id: 0,
          name: 'Imagine Dragons Demons.mp3',
          audio: new Audio('../../includes/songs/imagine_dragons_demons.mp3'),
          path: '../../includes/songs/imagine_dragons_demons.mp3',
          active: true
        },
        {
          id: 1,
          name: 'Скрябін Квінти.mp3',
          audio: new Audio('../../includes/songs/скрябін_квінти.mp3'),
          path: '../../includes/songs/скрябін_квінти.mp3',
          active: false
        },
        {
          id: 2,
          name: 'My chemical romance Fake your death.mp3',
          audio: new Audio('../../includes/songs/my_chemical_romance_fake_your_death.mp3'),
          path: '../../includes/songs/my_chemical_romance_fake_your_death.mp3',
          active: false
        },
        {
          id: 3,
          name: 'OneRepublic Good Life.mp3',
          audio: new Audio('../../includes/songs/onerepublic_good_life.mp3'),
          path: '../../includes/songs/onerepublic_good_life.mp3',
          active: false
        },
        {
          id: 4,
          name: 'Cliff Richard Somethin\' is going on.mp3',
          audio: new Audio('../../includes/songs/somethin\'_is_going_on.mp3'),
          path: '../../includes/songs/somethin\'_is_going_on.mp3',
          active: false
        },
      ],
      searchSongHistory: [],
      playPauseIcon: '../../includes/img/play.png',
      counter: 0,
      // to detect whhat songs were clicked by user
      clickedOn: [],
      // check if the song is playing
      paused: true
    }
  }

  render() {
    return(
      // dynamic src attribute for img to change the song when user clicks the next button
      <div className="player-container">
        <img src="../../includes/img/previous.png" alt="previos" className="player-container__previous-img" onClick={this.previousSong.bind(this)} />
        <img src={this.state.playPauseIcon} alt="play" className="player-container__play-img" onClick={this.switchSong.bind(this)} />
        <img src="../../includes/img/next.png" alt="next" className="player-container__next-img" onClick={this.nextSong.bind(this)} />
        <input type="range" min="0" max="100" className="player-container__progress" onMouseDown={this.rewindSong.bind(this)} /> <br />
        <img src="../../includes/img/volume.png" alt="volume" className="player-container__volume-img" />
        <input type="range" min="0" max="100" className="player-container__volume" onMouseMove={this.changeVolume.bind(this)}/>
        <Search findSongInTheList={this.findSongInTheList.bind(this)} list={this.state.songsDetails} />
        <SongsList setSongDuration={this.setSongDuration.bind(this)} audio={this.state.audio} list={this.state.songsDetails} pickSongFromList={this.pickSongFromList.bind(this)} changeActiveSong={this.changeActiveSong.bind(this)} />
      </div>
    );
  }

  // switch on/off sound when user clicks on/off btn
  switchSong() {
    if(this.state.audio.paused) {
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
    this.changeProgress();
    this.state.audio.play();
  }

  nextSong() {
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
    this.changeProgress();
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

  rewindSong(e) {
    e.target.value = e.clientX - e.target.offsetLeft;
    const rewindTo = this.state.audio.duration * (e.target.value / 100);
    this.state.audio.currentTime = rewindTo;
  }

  pickSongFromList(item) {
    this.state.clickedOn.push(item);
    const chosenSong = this.state.songsDetails.filter((song, index) => {
      return song.name == item;
    });
    /* prevent double initialisation of song.src to make the possibility set a pause,
      when click on the same song twice, not just repeat from the beginning */
    if(this.state.clickedOn[this.state.clickedOn.length - 2] != chosenSong[0].name) {
      this.state.audio.src = chosenSong[0].path;
    }
    // check if the previous element in the array is equil to current song (check if user clicked on the same song twice)
    if(item == this.state.clickedOn[this.state.clickedOn.length - 2] && this.state.paused == false) {
      // change the button to a pause mode when sound is on
      this.setState({
        playPauseIcon: '../../includes/img/play.png'
      });
      if(this.state.counter < this.state.songsDetails.length - 1) {
        this.state.counter = chosenSong[0].id
      } else {
        this.state.counter = 0;
      }
      // fire progress input movement
      this.changeProgress();
      this.state.audio.pause();
      // set paused property to true to switch the song later
      this.state.paused = true;
    } else {
      // change the button to a pause mode when sound is on
      this.setState({
        playPauseIcon: '../../includes/img/pause.png'
      });
      if(this.state.counter < this.state.songsDetails.length - 1) {
        this.state.counter = chosenSong[0].id
      } else {
        this.state.counter = 0;
      }
      this.changeProgress();
      this.state.audio.play();
      // set paused property to true to pause the song later
      this.state.paused = false;
    }

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

  setSongDuration(item, index) {
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
    this.state.songsDetails[index].duration = `${minutes}:${seconds}`;
    //this.state.songsDetails[index].duration = item.duration;
    this.setState({
      songsDetails: this.state.songsDetails
    })
  }

  findSongInTheList(song) {
    const foundSong = this.state.songsDetails2.filter((item, index) => {
      if(item.name.toLowerCase().indexOf(song.toLowerCase()) > -1) {
        return item;
      }
    });
    if(foundSong.length > 0) {
      this.setState({
        songsDetails: foundSong
      })
    } else if(foundSong.length == 0 ) {
      this.setState({
        songsDetails: []
      })
    } else if(song == '') {
      this.setState({
        songsDetails: this.state.songsDetails2
      })
    }
  }

}
