import React from "react";
import './Track.css';

export class Track extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return '-';
    }
    return (
      <div onClick={this.addTrack}>
        +
      </div>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.name}
          </h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        <button className="Track-action">
          {this.renderAction()}
          {/* <!-- + or - will go here --> */}
        </button>
      </div>
    );
  }
}