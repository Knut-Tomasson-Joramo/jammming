import React from "react";
import './Track.css';

export class Track extends React.Component {

  renderAction() {
    if (this.props.isRemoval) {
      return '-';
    }
    return '+';
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.name}
          </h3>
          <p>
            {this.props.artist} | {this.props.albume}
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