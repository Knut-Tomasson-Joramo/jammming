import React from "react";
import { Track } from '../Track/Track.js';
import './TrackList.css';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      {/* <!-- You will add a map method that renders a set of Track components  --> */
      this.props.tracks.map((track) => {
        return (
          <Track 
            name={track.name} 
            artist={track.artist}
            album={track.album}
            key={track.id} />
        );
      })}
      </div>
    );
  }
}