import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NomsContext from '../../NomsContext'
import './NominatedRestaurant.css'

export default class NominatedRestaurant extends Component {
    constructor(props){
        super(props)
        this.state = {
            userDidLike: false
        }
    }
    static contextType = NomsContext
    
    handleOnClickVote = () => {
        this.context.voteForRestaurant(this.context.userId, this.props.id)
    }
    handleOnClickUndoVote = () => {
        this.context.undoVoteForRestaurant(this.context.userId, this.props.id)
    }

    checkIfUserAlreadyVoted = () => {
        const checkIfUserDidLike = this.context.likes_and_comments[this.props.id].liked_by.filter(lk => lk.user === this.context.userId)

        if(checkIfUserDidLike.length){
            this.setState({
                userDidLike: true
            })
        } else {
            this.setState({
                userDidLike: false
            })
        }
    }

    componentWillReceiveProps(){
        this.checkIfUserAlreadyVoted()
    }
    componentDidMount(){
        this.checkIfUserAlreadyVoted()
    }


	render() {

		return (
			<div className='preview-nom-box'>
				<Link to={`/category/${this.props.category}/${this.props.id}`}>
                    <h5>{this.props.name}</h5>
                </Link>
				<span>
                    Votes: {this.props.likesComments.liked_by.length}
				</span>
				<button
					className={this.state.userDidLike ? 'upvote-btn hide' : 'upvote-btn'}
                    onClick={this.handleOnClickVote}
					disabled={!this.props.loggedIn}
				>
					Upvote!
				</button>
				<button
					className={!this.state.userDidLike ? 'upvoted-btn hide' : 'upvoted-btn'}
                    onClick={this.handleOnClickUndoVote}
					disabled={!this.props.loggedIn}
				>
					You upvoted this
				</button>
				{/* <a href='#'>See More</a> */}
			</div>
		)
	}
}
