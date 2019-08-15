import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import * as postActions from '../../reducers/post';
import * as userActions from '../../reducers/user';

import PostCard from '../../components/PostCard';
import UserProfile from '../../components/UserProfile';

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(postActions.loadUserPostsRequest(id));
    dispatch(userActions.loadUserReuqestAction(id));
  }, []);

  return (
    <div style={{ marginTop: '2em' }}>
      {
        userInfo && <UserProfile userData={userInfo} />
      }
      {
        mainPosts && mainPosts.map(v => <PostCard key={v._id} post={v} />)
      }
    </div>
  );
};

User.propTypes = {
  id: PropTypes.string.isRequired,
};

User.getInitialProps = async (context) => {
  console.log('User getInitialProps', context.query.userid);
  return { id: context.query.userid };
};

export default User;
