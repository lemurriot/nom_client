import React, { Component } from 'react'
import './VoteButtons.css'
import NomsContext from '../../NomsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class VoteButtons extends Component {
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
        let checkIfUserDidLike = [1,2]
        // let checkIfUserDidLike 
        this.context.likes_and_comments[this.props.id] ? checkIfUserDidLike = this.context.likes_and_comments[this.props.id].liked_by.filter(lk => lk.user === this.context.userId) : checkIfUserDidLike = [1, 2]
        console.log(this.context)

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
			<div className='buttons-container'>
				<button
					className={this.state.userDidLike ? 'upvote-btn vote-btn hide' : 'upvote-btn vote-btn'}
                    onClick={this.handleOnClickVote}
					disabled={!this.context.loggedIn}
				>
					Upvote! <FontAwesomeIcon icon="star" color="white"/>
				</button>
				<button
					className={!this.state.userDidLike ? 'upvoted-btn vote-btn hide' : 'upvoted-btn vote-btn'}
                    onClick={this.handleOnClickUndoVote}
					disabled={!this.context.loggedIn}
				>
					You upvoted this <FontAwesomeIcon icon="star" color="gold"/>
				</button>
			</div>
		)
	}
}
