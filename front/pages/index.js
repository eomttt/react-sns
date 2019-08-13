import React, { useEffect } from 'react'; // eslint 에서 react 쓰면 import 하라고 명시됨
import { useSelector, useDispatch } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import * as postActions from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(postActions.loadMainPostsRequest());
  }, []);

  return (
    <div>
      {me && <PostForm />}
      {
        mainPosts.map(v => <PostCard key={v._id} post={v} />)
      }
    </div>
  );
};

export default Home;
