import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../reducers/post';

import PostCard from '../../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(actions.loadHashTagPostsRequest(tag));
  }, []);

  return (
    <div>
      {
        mainPosts && mainPosts.map(v => <PostCard key={v._id} post={v} />)
      }
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => {
  console.log('Hashtag getInitialProps', context.query.tag);
  return { tag: context.query.tag };
};

export default Hashtag;
