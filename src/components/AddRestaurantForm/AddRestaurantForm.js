import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AddRestaurantForm.css'
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
    handleSubmit(e){
        e.preventDefault()
        const newLikesTableId = uuid.v4()
        const newRestaurantId = uuid.v4()
        const newNomination = {
            id: newRestaurantId,
            food_category: this.state.category.value,
            date_nominated: Date.now(),
            name: this.state.restaurant_name.value,
            nominated_by_user: this.props.userId,
            likes_table: newLikesTableId
        }
        const newLikesTable = {
            id: newLikesTableId,
            rest_id: newRestaurantId,
            liked_by: [
                {
                    user: this.props.userId,
                    date_liked: Date.now(),
                    comment: this.state.comment.value
                }
            ]
        }
        // console.log(newNomination, newLikesTable)
        this.props.handleAddRestaurant(newNomination, newLikesTable)
        this.props.history.push('/')
    }
    handleCategoryInputChange(e){
        this.setState({
            category: {
                value: e.target.value,
                touched: true
            }
        })
    }
    handleRestaurantNameInputChange(e){
        this.setState({
            restaurant_name: {
                value: e.target.value,
                touched: true
            }
        })
    }
    handleCommentInputChange(e){
        this.setState({
            comment: {
                value: e.target.value,
                touched: true
            }
        })
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
                                aria-label="food category"
                                aria-required="true"
                                aria-describedby="categoryError"
                                onChange={e => this.handleCategoryInputChange(e)}
                                required
							>
                                <option disabled value=''> -- select an option -- </option>
								<option value='Burgers'>Burger</option>
								<option value='Burritos'>Burrito</option>
								<option value='Falafels'>Falafel</option>
							</select>
							<label htmlFor='restaurant-name'>
								Restaurant Name (required)
							</label>
							<input
								type='text'
                                name='restaurant-name'
                                id='restaurant-name'
                                value={this.state.restaurant_name.value}
                                aria-label="restaurant name"
                                aria-required="true"
                                aria-describedby="restaurantError"
                                onChange={e => this.handleRestaurantNameInputChange(e)}
                                required
							/>


							<label htmlFor='comment'>
								Comment (optional)
							</label>
							<textarea
								name='item-comment'
								id='item-comment'
                                placeholder='Comment on this food item or experience'
                                value={this.state.comment.value}
                                aria-label="comment on this entry"
                                aria-required="true"
                                aria-describedby="commentError"
                                onChange={e => this.handleCommentInputChange(e)}
                                required
							></textarea>

						</div>
						<div className='buttons'>
							<Link to='/my-reviews'>
								<button className='cxl-btn'>
									Cancel
								</button>
							</Link>
							<button className='submit-btn'>
								Submit
							</button>
						</div>
					</form>
				</section>
			</main>
		)
	}
}
