import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AddRestaurantForm.css'
import NomsContext from '../../NomsContext'
import ValidationError from '../Validation/Validation'
import uuid from 'uuid'

export default class AddRestaurantForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			category: {
				value: '',
				touched: false,
			},
			restaurant_name: {
				value: '',
				touched: false,
			},
			comment: {
				value: '',
				touched: false,
			},
		}
	}
	static contextType = NomsContext

	handleSubmit(e) {
		e.preventDefault()
		const newRestaurantId = uuid.v4()
		const newNomination = {
			id: newRestaurantId,
			food_category: this.state.category.value,
			date_nominated: Date.now(),
			name: this.state.restaurant_name.value,
			nominated_by_user: this.props.userId,
			likes_table: newRestaurantId,
		}
		const newLikesTable = {
			id: newRestaurantId,
			rest_id: newRestaurantId,
			liked_by: [
				{
					user: this.context.userId,
					date_liked: Date.now(),
					comment: this.state.comment.value,
				},
			],
		}
		this.props.handleAddRestaurant(
			newNomination,
			newLikesTable,
			newRestaurantId,
		)
		this.props.history.push('/')
	}
	handleCategoryInputChange(e) {
		this.setState({
			category: {
				value: e.target.value,
				touched: true,
			},
		})
	}
	handleRestaurantNameInputChange(e) {
		this.setState({
			restaurant_name: {
				value: e.target.value,
				touched: true,
			},
		})
	}
	handleCommentInputChange(e) {
		this.setState({
			comment: {
				value: e.target.value,
				touched: true,
			},
		})
	}
	validateRestaurantName() {
		const name = this.state.restaurant_name.value.trim()
		const category = this.state.category.value
		if (name.length === 0) return 'Restaurant name is required'
		if (
			this.context.nominated_restaurants.find(
				restaurant =>
					restaurant.name === name &&
					restaurant.food_category === category,
			)
		)
			return 'A restaurant with that name is already nominated in this category'
	}
	showCurrentNominatedRestaurants() {
		const { nominated_restaurants } = this.context
		const { category, restaurant_name } = this.state
		let re = new RegExp(restaurant_name.value, 'i')
		let currentRestaurantFilter
		if (!category.value) {
			currentRestaurantFilter = nominated_restaurants
		} else if (category.value && !restaurant_name.value) {
			currentRestaurantFilter = nominated_restaurants.filter(
				restaurant => restaurant.food_category === category.value,
			)
		} else {
			currentRestaurantFilter = nominated_restaurants.filter(
				restaurant =>
					restaurant.food_category === category.value &&
					restaurant.name.match(re),
			)
		}
		if (!currentRestaurantFilter.length) {
			return <span>No Matches</span>
		} else {
			return currentRestaurantFilter.map((restaurant, i) => (
				<div className='current-filtered-list' key={i}>
					<span className='current-filtered-list-name'>
						{restaurant.name}
					</span>
					<span className='current-filtered-list-category'>
						Nominated for Best {restaurant.food_category}
					</span>
				</div>
			))
		}
	}

	render() {
		return (
			<main>
				<section className='form-modal'>
					<div className='brand'>
						<span className='logo'>★</span>
						<h1>NomsPDX</h1>
					</div>
					<form onSubmit={e => this.handleSubmit(e)}>
						<div className='container'>
							<h2>
								Nominate a Restaurant for Best in
								Category!
							</h2>
							<label htmlFor='food-category'>
								Category (required)
							</label>
							<select
								name='food-category'
								id='food-category'
								value={this.state.category.value}
								aria-label='food category'
								aria-required='true'
								aria-describedby='categoryError'
								onChange={e =>
									this.handleCategoryInputChange(e)
								}
								required
							>
								<option disabled value=''>
									{' '}
									-- select an option --{' '}
								</option>
								<option value='Burgers'>Burger</option>
								<option value='Burritos'>
									Burrito
								</option>
								<option value='Falafels'>
									Falafel
								</option>
							</select>
							<label htmlFor='restaurant-name'>
								Restaurant Name (required)
							</label>
							<input
								type='text'
								name='restaurant-name'
								id='restaurant-name'
								value={this.state.restaurant_name.value}
								aria-label='restaurant name'
								aria-required='true'
								aria-describedby='restaurantError'
								onChange={e =>
									this.handleRestaurantNameInputChange(
										e,
									)
								}
								required
							/>
							{this.state.restaurant_name.touched && (
								<ValidationError
									message={this.validateRestaurantName()}
									validationId={'restaurantError'}
								/>
							)}

							<label htmlFor='comment'>
								Comment (optional)
							</label>
							<textarea
								name='item-comment'
								id='item-comment'
								placeholder='Comment on this food item or experience'
								value={this.state.comment.value}
								aria-label='comment on this entry'
								aria-required='true'
								aria-describedby='commentError'
								onChange={e =>
									this.handleCommentInputChange(e)
								}
							></textarea>
						</div>
						<div className='buttons'>
							<Link to='/'>
								<button className='cxl-btn'>
									Cancel
								</button>
							</Link>
							<button
								className='submit-btn'
								disabled={this.validateRestaurantName()}
							>
								Submit
							</button>
						</div>
					</form>
				</section>
				<section className='filtered-list-container'>
					<h3>Current Matching Nominations</h3>
					<p>Please don't add duplicates ;)</p>
					{this.showCurrentNominatedRestaurants()}
				</section>
			</main>
		)
	}
}
