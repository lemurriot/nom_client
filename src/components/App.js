import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NomsContext from '../NomsContext'
import STORE from '../store.js'

import LandingPage from './LandingPage/LandingPage'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'
import AddRestaurantForm from './AddRestaurantForm/AddRestaurantForm'
import MyReviews from './MyReviews/MyReviews'
import NotFoundPage from './NotFoundPage/NotFoundPage'


import './App.css'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: true,
			userId: "12",
			nominated_restaurants: [],
			users: [],
			likes_and_comments: [],
			error: null,
		}
	}
	componentDidMount() {
		this.setState(STORE)
	}

	handleAddRestaurant = (newRestaurant, newLike) => {
		this.setState({
			nominated_restaurants: [
				...this.state.nominated_restaurants,
				newRestaurant,
			],
			likes_and_comments: [...this.state.likes_and_comments, newLike],
		})
  }
  
  handleVoteForRestaurant = (userID, restaurantID) => {
    const { likes_and_comments } = this.state
    const selectedRestaurant = likes_and_comments.filter(lc => lc.rest_id === restaurantID)
    const notSelectedRestaurants = likes_and_comments.filter(lc => lc.rest_id !== restaurantID)
  
    const checkIfAlreadyLiked = selectedRestaurant[0].liked_by.filter(like => like.user === userID)

    if (checkIfAlreadyLiked.length){
      this.setState({
        error: "User already voted"
      })
    } else {
      const newLikedByObj = {
        user: this.state.userId,
        date_liked: Date.now(),
        comment: ''
      }
      const newLikesCommentsObj = {...selectedRestaurant[0]}
      newLikesCommentsObj.liked_by.push(newLikedByObj)
      this.setState({
        likes_and_comments: [...notSelectedRestaurants, newLikesCommentsObj]
      })
    }
  
    }


	handleLogin = e => {
		e.preventDefault()
		this.setState({
			loggedIn: true,
		})
	}
	handleLogout = e => {
		e.preventDefault()
		this.setState({
			loggedIn: false,
		})
	}
	render() {
		const contextVal = {
			loggedIn: this.state.loggedIn,
			userId: this.state.userId,
			nominated_restaurants: this.state.nominated_restaurants,
			users: this.state.users,
			likes_and_comments: this.state.likes_and_comments,
			nominateNewRestaurant: this.handleAddRestaurant,
			voteForRestaurant: this.handleVoteForRestaurant,
		}
		return (
			<NomsContext.Provider value={contextVal}>
				<div className='App'>
					<Switch>
						<Route
							exact
							path='/'
							render={props => (
								<LandingPage
									{...props}
									likesComments={
										this.state.likes_and_comments
									}
									nominated_restaurants={
										this.state
											.nominated_restaurants
									}
									loggedIn={this.state.loggedIn}
									onLogout={this.handleLogout}
								/>
							)}
						/>
						<Route
							path='/login'
							render={props => (
								<LoginForm
									{...props}
									onLogin={this.handleLogin}
								/>
							)}
						/>
						<Route
							path='/register'
							component={RegisterForm}
						/>
						<Route
							path='/add-new-nom'
							render={props => (
								<AddRestaurantForm
									{...props}
									handleAddRestaurant={
										this.handleAddRestaurant
									}
									userId={this.state.userId}
								/>
							)}
						/>
						<Route
							path='/my-reviews'
							render={props => (
								<MyReviews
									{...props}
									restaurants={
										this.state
											.nominated_restaurants
									}
									userId={this.state.userId}
									loggedIn={this.state.loggedIn}
									onLogout={this.handleLogout}
								/>
							)}
						/>
						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</NomsContext.Provider>
		)
	}
}
