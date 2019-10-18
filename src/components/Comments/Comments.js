import React from 'react'
import './Comments.css'

export default function Comments(props) {
    return (
        <div className="comment-card">
            <span className="comment-quote">"{props.comment}"</span>
            <span className="comment-user">-{props.username}</span>
        </div>
    )
}
