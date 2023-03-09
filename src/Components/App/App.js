// import logo from './logo.svg';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js'
import React from 'react';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'Killing in the name of', artist: 'RAGM', album: 'some album', id: 1234},
        {name: 'Hurt', artist: 'Johnny Cash', album: 'the album', id: 1235},
        {name: 'Toms Diner', artist: 'Poppy', album: 'poppys', id: 1236}
      ],
      playlistName: 'my playlist',
      playlistTracks: [
        {name: 'Killing in the name of', artist: 'RAGM', album: 'some album', id: 1234}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const trackId = track.id;
    const playlistTracksCopy = this.state.playlistTracks;
    // check if trackId already in playlist
    if (!playlistTracksCopy.some(t => t.id === trackId)) {
      playlistTracksCopy.push(track);
      this.setState( {
        playlistTracks: playlistTracksCopy
      });
    }
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} />
        </div>
      </div>
    </div>
    );
  }
}

