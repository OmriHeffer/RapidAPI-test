import React from 'react';
import Draggable from './Draggable';
import {getUserData, saveUserData} from './connectors';
import PropTypes from 'prop-types';

import './login.css';

// The component representing the logged-in view.
export default class LoggedIn extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  // Either get the data from an external source (localStorage) or sets a default.
  constructor(props) {
    super(props);
    const imgUrl = "https://vignette.wikia.nocookie.net/pixelpeople/images/1/16/Parrot.png/revision/latest?cb=20130411230755";
    let data = getUserData(props.data.username);
    
    if (!data) {
      data = {
        picCoords: {x: null, y: null},
        nameCoords: {x: null, y: null},
        username: props.data.username,
        image: imgUrl
      };
    }

    this.state = data;
  }

  updateCoords = (data, isPic) => {
    if (isPic) {
      this.setState({picCoords: data}, () => {
        saveUserData(this.state.username, this.state);
      });
    } else {
      this.setState({nameCoords: data}, () => {
        saveUserData(this.state.username, this.state);
      });
    }
  }

  render() {
    return (
      <div>
        <div className="center-container">
          <h1 className="header-text">Welcome, {this.props.data.username}!</h1>
          <button className="btn" onClick={this.props.onLogout}>Let me out.</button>
        </div>

        <Draggable id="userDrag"
          coords={this.state.nameCoords}
          onUpdate={(data) => {this.updateCoords(data, false)}}>
          <h1 className="header-text">{this.props.data.username}</h1>
        </Draggable>

        <Draggable id="picDrag"
          coords={this.state.picCoords}
          onUpdate={(data) => {this.updateCoords(data, true)}}>
          <img src={this.state.image} alt="user"/>
        </Draggable>
      </div>
    );
  }
}