import React from 'react';
import axios from 'axios';

import Auth from '../lib/Auth';

class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/register', this.state.credentials)
      .then( res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Register page</h2>
            <div className="field">
              <label className="label">User Name</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="username" placeholder="User Name" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="password" type="password" placeholder="Password" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="password_confirmation" type="password" placeholder="Password" onChange={this.handleChange} />
              </div>
            </div>
            {this.state.error && <small className="help is-danger">{this.state.error}</small>}

            <div className="level control">
              <div className="level-item">
                <button className="button is-primary is-rounded is-medium">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default Register;
