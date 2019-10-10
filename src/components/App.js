import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './Main/Main'

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
        </Switch>
        <footer>Footer</footer>
      </div>
    )
  }
}
