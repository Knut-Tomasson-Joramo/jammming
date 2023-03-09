import React from "react";
import { Track } from '../Track/Track.js';
import './TrackList.css';

export class TrackList extends React.Component {
  render() {
    const tracks = this
                   .props
                   .tracks
                   .map((track) => <Track 
                                    name={track.name}
                                    artist={track.artist}
                                    album={track.album}
                                    key={track.id}
                                    track={track}
                                    onAdd={this.props.onAdd} />);
    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}