import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './Main/Main'
import LoginForm from './LoginForm/LoginForm'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
    }
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            exact 
            path="/" 
            component={Main}
          />
          <Route 
            path="/login"
            component={LoginForm}
          />
        </Switch>
      </div>
    )
  }
}
