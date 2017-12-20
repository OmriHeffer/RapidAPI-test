import React from 'react';
import PropTypes from 'prop-types';

import './draggable.css';

// A draggable component. Its' contents are filled via this.props.children.
export default class Draggable extends React.Component {
  static propTypes = {
    coords: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    let coords = props.coords;

    this.state = {
      x: null || coords.x,
      y: null || coords.y
    };
  }

  // Get the current X/Y coordinates, and calculate the difference from the top-left corner
  handleDragStart = (e) => {
    const el = e.currentTarget.getBoundingClientRect();
    
    this.setState({
      xMod: e.clientX - el.x,
      yMod: e.clientY - el.y
    });
  }

  // Each call, set a new X/Y coordinate.
  // Validates that the cursor is still in the view.
  handleDrag = (e) => {
    const x = e.clientX - this.state.xMod;
    const y = e.clientY - this.state.yMod;

    if (e.clientY > 0) {
      this.setState({
        x: x,
        y: y
      });
    }
  }

  // Needed, otherwise dragging won't work
  handleDragOver = (e) => {
    e.preventDefault();
  }


  // Sends an update with the new location.
  handleDragEnd = () => {
    this.props.onUpdate({
      x: this.state.x,
      y: this.state.y
    });
  }

  render() {
    // Set dynamic style
    const transStyle = {
      top: this.state.y,
      left: this.state.x
    };

    return (
      <div
        className={"draggable " + this.props.id + (this.state.isMoving? " dragging" : "")}
        onDragStart={(e) => this.handleDragStart(e)}
        onDrag={(e) => this.handleDrag(e)}
        onDragOver={(e) => this.handleDragOver(e)}
        onDrop={(e) => this.handleDragOver(e)}
        onDragEnd={this.handleDragEnd}
        draggable
        style={transStyle}
      >
        {this.props.children}
      </div>
    );
  }
}