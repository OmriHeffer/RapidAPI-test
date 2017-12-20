import React from 'react';
import PropTypes from 'prop-types';

import './login.css';

export default class Login extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  // Updates the username and password in the state.
  handleChange = (e, changed) =>  {
    if (changed === 'username') {
      this.setState({ username: e.target.value });
    } else if (changed === 'password') {
      this.setState({ password: e.target.value });
    }
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onLogin(e, this.state) }}>
        <div className="center-container">
          <h1 className="header-text">Login</h1>

          <div className="input-container">
            <input
              type="text" 
              className="login-input" 
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e, 'username')}/>
          </div>

          <div className="input-container">
            <input 
              type="password" 
              className="login-input" 
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e, 'password')}/>
          </div>

          <div className="input-container">
            <input type="submit" className="btn" value="Let me in."/>
          </div>
        </div>
      </form>
    );
  }
}