import React, { Component } from 'react'
import NomsContext from '../../NomsContext'
import './NominatedRestaurant.css'

export default class NominatedRestaurant extends Component {
    static contextType = NomsContext
    
    handleOnClickVote = () => {
        console.log('click')
        this.context.voteForRestaurant(this.context.userId, this.props.id)
    }

    // componentDidUpdate(){
    //     const findLikeCommentTable = this.context.likes_and_comments.filter(lc => lc.rest_id === this.props.id)
    //     console.log(findLikeCommentTable)
    // }


	render() {
		return (
			<div className='preview-nom-box'>
				<h5>{this.props.name}</h5>
				<span>
                    Votes: {this.props.likesComments.liked_by.length}
				</span>
				<button
					className={'upvote-btn'}
                    onClick={this.handleOnClickVote}
					disabled={!this.props.loggedIn}
				>
					Upvote!
				</button>
				<button
					className={'upvoted-btn'}
                    onClick={this.handleOnClickUndoVote}
					disabled={!this.props.loggedIn}
				>
					You upvoted this
				</button>
				<a href='#'>See More</a>
			</div>
		)
	}
}
