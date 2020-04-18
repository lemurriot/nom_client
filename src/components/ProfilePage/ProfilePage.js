/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Tabs, Tab, AppBar } from '@material-ui/core';
import { useStyles } from '../../hooks/useStyles';
import TabPanel from '../TabPanel/TabPanel';
import { putNewUsername } from '../../api/routes';
import UserDidUpvoteList from './UserDidUpvoteList';
import UserDidNominateList from './UserDidNominateList';
import FormDialog from '../Dialog/FormDialogue';
import NomsContext from '../../NomsContext';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import './ProfilePage.css';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const {
    user,
    username,
    addEditComment,
    changeUsernameLocally,
    setShowFeedbackSnackbar,
  } = useContext(NomsContext);
  const { goBack } = useHistory();
  const [commentsFormIsShown, setShowCommentsForm] = useState(false);
  const [changeUsernameFormIsShown, setChangeUsernameFormIsShown] = useState(
    false
  );
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChangeTabs = (_event, newValue) => {
    setValue(newValue);
  };

  const [commentsData, setCommentsData] = useState({});

  const closeCommentsForm = () => {
    setShowCommentsForm(false);
  };

  const handleAddEditCommentSubmit = () => {
    closeCommentsForm();
  };

  const deleteComment = (likeId, restaurantId) => {
    addEditComment(likeId, '', restaurantId);
    handleAddEditCommentSubmit('');
  };

  const handleShowCommentForm = (commentData) => {
    setCommentsData({ ...commentData });
    setShowCommentsForm(true);
  };

  const handleChangeUsername = async (newUsername) => {
    handleAddEditCommentSubmit();
    localStorage.setItem('username', newUsername);
    putNewUsername(newUsername, user.id).then((confirmation) => {
      if (confirmation.error) {
        return setShowFeedbackSnackbar(confirmation.error);
      }
      changeUsernameLocally(newUsername);
      setChangeUsernameFormIsShown(false);
      return setShowFeedbackSnackbar(confirmation.message);
    });
  };

  return (
    <main className="page">
      <Button onClick={goBack} variant="contained" className="go-back-btn">
        Go back
      </Button>
      <div className="user-info">
        <h4>{`Hello ${username}`}</h4>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setChangeUsernameFormIsShown(true)}
        >
          Change username
        </Button>
      </div>
      <div className={`page-content-container ${classes.profileTabsRoot}`}>
        <AppBar
          position="static"
          style={{ flexDirection: 'row', borderRadius: '8px 8px 0 0' }}
        >
          <Tabs
            value={value}
            onChange={handleChangeTabs}
            aria-label="profile information tabs"
          >
            <Tab label="Your Upvotes" {...a11yProps(0)} />
            <Tab label="Your Nominations" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <h4 className="montserrat center tab-title">You Upvoted</h4>
          <UserDidUpvoteList onShowCommentForm={handleShowCommentForm} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h4 className="montserrat center tab-title">
            Your Restaurant Nominations
          </h4>
          <UserDidNominateList />
        </TabPanel>
      </div>
      {commentsFormIsShown && (
        <AddCommentForm
          restaurantName={commentsData.name}
          restaurantId={commentsData.restaurantId}
          commentId={commentsData.id}
          comment={commentsData.comment}
          handleSubmit={handleAddEditCommentSubmit}
          addEditComment={addEditComment}
          closeCommentsForm={closeCommentsForm}
          deleteComment={() =>
            deleteComment(commentsData.id, commentsData.restaurantId)
          }
        />
      )}
      {changeUsernameFormIsShown && (
        <FormDialog
          open
          handleClose={() => setChangeUsernameFormIsShown(false)}
          handleSubmit={(newUsername) => handleChangeUsername(newUsername)}
        />
      )}
    </main>
  );
};

export default ProfilePage;
