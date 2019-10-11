import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'
import STORE from '../dummy-store.js'
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      reviews: [],
      users: [],
      restaurants: [],
      error: null,
    }
  }
  componentDidMount(){
    this.setState(STORE)
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => (<LandingPage reviews={this.state.reviews} restaurants={this.state.restaurants}/>)}
          />
          <Route 
            path="/login"
            component={LoginForm}
          />
          <Route 
            path="/register"
            component={RegisterForm}
          />
        </Switch>
      </div>
    )
  }
}
