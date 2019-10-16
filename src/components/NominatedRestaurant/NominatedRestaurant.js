import React from 'react'
import './NominatedRestaurant.css'

export default function NominatedRestaurant(props) {
    const shouldBtnBeDisabled = props.loggedIn ? false : true
    return (
        <div className="preview-nom-box">
            <h5>{props.name}</h5>
            <span>Votes: {props.likesComments[0].liked_by.length}</span>
            <button className="upvote-btn" disabled={shouldBtnBeDisabled}>Upvote!</button>
            <a href="#">See More</a>
        </div>
    )
}
