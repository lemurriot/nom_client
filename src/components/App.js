import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'
import AddRestaurantForm from './AddRestaurantForm/AddRestaurantForm'
import MyReviews from './MyReviews/MyReviews'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import STORE from '../store.js'

import './App.css'


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      nominated_restaurants: [],
      users: [],
      likes_and_comments: [],
      error: null,
    }
  }
  componentDidMount(){
    this.setState(STORE)
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.setState({
      loggedIn: true
    })
  }
  handleLogout = (e) => {
    e.preventDefault()
    this.setState({
      loggedIn: false
    })
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => (<LandingPage {...props} likesComments={this.state.likes_and_comments} nominated_restaurants={this.state.nominated_restaurants} loggedIn={this.state.loggedIn} onLogout={this.handleLogout}/>)}
          />
          <Route 
            path="/login"
            render={(props) => (<LoginForm {...props} onLogin={this.handleLogin}/>)}
          />
          <Route 
            path="/register"
            component={RegisterForm}
          />
          <Route 
            path="/add-new-nom"
            component={AddRestaurantForm}
          />
          <Route 
            path="/my-reviews"
            render={(props) => (<MyReviews {...props} restaurants={this.state.nominated_restaurants} loggedIn={this.state.loggedIn} onLogout={this.handleLogout}/>)}
          />
            <Route
              component={NotFoundPage}
            />
        </Switch>
      </div>
    )
  }
}
