import React from 'react';
import { string } from 'prop-types';
import './Comments.css';

const Comments = ({ comment, username }) => (
  <div className="comment-card">
    <span className="comment-card__quote">&quot;{comment}&quot;</span>
    <span className="comment-card__user roboto">-{username}</span>
  </div>
);

Comments.propTypes = {
  comment: string.isRequired,
  username: string.isRequired,
};

export default Comments;
