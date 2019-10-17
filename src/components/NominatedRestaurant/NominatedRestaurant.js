import React, { Component } from 'react'
import NomsContext from '../../NomsContext'
import './NominatedRestaurant.css'

export default class NominatedRestaurant extends Component {
    static contextType = NomsContext
    
    handleOnClickVote = () => {
        console.log('click')
        this.context.voteForRestaurant(this.context.userId, this.props.id)
    }
	render() {
		return (
			<div className='preview-nom-box'>
				<h5>{this.props.name}</h5>
				<span>
					Votes: {this.props.likesComments[0].liked_by.length}
				</span>
				<button
					className={'upvote-btn'}
                    onClick={this.handleOnClickVote}
					disabled={!this.props.loggedIn}
				>
					Upvote!
				</button>
				<a href='#'>See More</a>
			</div>
		)
	}
}
