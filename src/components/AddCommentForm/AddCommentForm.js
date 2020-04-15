import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
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
        <Button
          variant="contained"
          size="small"
          className="go-back-btn"
          onClick={closeCommentsForm}
        >
          Cancel
        </Button>
        <h2 className="montserrat center">{instructionText}</h2>
        <span style={{ fontSize: '.7em' }}>Comment:</span>
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
          {({ values, isSubmitting }) => (
            <Form>
              <Field
                type="text"
                as="textarea"
                name="comment"
                style={{
                  border: '1px solid grey',
                  borderRadius: 2,
                  width: '100%',
                }}
              />
              <ErrorMessage name="comment" component="div" />
              <div className="comment-form__buttons-container">
                <Button
                  variant="outlined"
                  size="small"
                  disabled={!values.comment || isSubmitting}
                  onClick={deleteComment}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!values.comment || isSubmitting}
                >
                  Submit
                </Button>
              </div>
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
