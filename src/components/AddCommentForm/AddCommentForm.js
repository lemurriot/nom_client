import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './AddCommentForm.css';

const AddCommentForm = props => {
  const {
    restaurantName,
    comment,
    commentId,
    restaurantId,
    addEditComment,
    closeCommentsForm,
    handleSubmit,
    deleteComment,
  } = props;
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
        <h2>Add/Edit Your Comment for {restaurantName}</h2>
        <span>Comment</span>
        <Formik
          initialValues={{ comment }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              addEditComment(commentId, values.comment, restaurantId);
              setSubmitting(false);
              handleSubmit(values.comment);
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

export default AddCommentForm;
