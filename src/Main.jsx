import React from 'react';
import { validateLogin } from './connectors';
import LoggedIn from './LoggedIn';
import Login from './Login';

import './index.css';

// The main component.
export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      data: null
    };
  }

  // Validates the credentials before signing-in.
  handleLogin = (e, data) => {
    e.preventDefault();

    if (validateLogin(data.username, data.password)) {
      this.setState({
        loggedIn: true,
        data: data
      });
    }
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      data: null
    });
  }

  render() {
    if (this.state.loggedIn) {
      return <LoggedIn
        data={this.state.data}
        onLogout={() => {this.handleLogout()}}/>
    }
    else {
      return <Login onLogin={(e, data) => this.handleLogin(e, data)}/>
    }
  }
}