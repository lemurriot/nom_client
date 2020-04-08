import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { number, string, func } from 'prop-types';
import './AddCommentForm.css';

const AddCommentForm = ({
  restaurantName,
  comment,
  commentId,
  restaurantId,
  addEditComment,
  closeCommentsForm,
  handleSubmit,
  deleteComment,
}) => {
  const instructionText = comment.length
    ? `Edit your comment for ${restaurantName}`
    : `Add a comment for ${restaurantName}`;
  return (
    <div className="form-container--outer">
      <div className="form-container--inner">
        <button
          className="close-modal"
          type="button"
          onClick={closeCommentsForm}
        >
          Go Back
        </button>
        <h2>{instructionText}</h2>
        <span>Comment</span>
        <Formik
          initialValues={{ comment }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              const confirmation = await addEditComment(
                commentId,
                values.comment,
                restaurantId
              );
              if (!confirmation.error) {
                handleSubmit(values.comment);
              }
              setSubmitting(false);
              closeCommentsForm();
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="comment" />
              <ErrorMessage name="comment" component="div" />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={deleteComment}
              >
                Delete Comment
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

AddCommentForm.propTypes = {
  restaurantName: string.isRequired,
  comment: string.isRequired,
  commentId: number.isRequired,
  restaurantId: number.isRequired,
  addEditComment: func.isRequired,
  closeCommentsForm: func.isRequired,
  handleSubmit: func.isRequired,
  deleteComment: func.isRequired,
};

AddCommentForm.defaultProps = {};

export default AddCommentForm;
