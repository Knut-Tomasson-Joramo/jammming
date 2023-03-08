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
        {name: 'Killing in the name of', artist: 'RAGM', album: 'some album', id: '1234'},
        {name: 'Hurt', artist: 'Johnny Cash', album: 'the album', id: '1235'},
        {name: 'Toms Diner', artist: 'Poppy', album: 'poppys', id: '1236'}
      ]
    };
  }
  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist />
        </div>
      </div>
    </div>
    );
  }
}

