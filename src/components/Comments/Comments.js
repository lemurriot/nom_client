import React from 'react';
import PropTypes from 'prop-types';
import './Comments.css';

const Comments = ({ comment, username }) => (
  <div className="comment-card">
    <span className="comment-quote">"{comment}"</span>
    <span className="comment-user">-{username}</span>
  </div>
);

Comments.propTypes = {
  comment: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Comments;
