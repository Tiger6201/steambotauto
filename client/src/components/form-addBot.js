import React, { Component } from 'react';

class FormAddBot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      password: ''
    }
  }

  handleChange(e, key) {
    switch (key) {
      case 'user':
        this.setState({ user: e.currentTarget.value });
        break;
      case 'password':
        this.setState({ password: e.currentTarget.value });
        break;
      default:
        break;
    }

  }

  render() {

    const { actions } = this.props;

    return (
      <div className="formAddBot">
        <div class="form-group">
          <label for="exampleInputUser1">User</label>
          <input class="form-control" key="user" value={this.state.user} placeholder="Enter user" onChange={(e) => this.handleChange(e, 'user')}></input>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input class="form-control" key="password" value={this.state.password} placeholder="Password" onChange={(e) => this.handleChange(e, 'password')}></input>
        </div>
        <button type="submit" class="btn btn-primary" onClick={() => actions.addBot({ user: this.state.user, password: this.state.password })}>Submit</button>

      </div>
    )
  }
}

export default FormAddBot;
