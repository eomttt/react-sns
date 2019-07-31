import React from 'react'; // eslint 에서 react 쓰면 import 하라고 명시됨
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      {
        mainPosts.map((v) => {
          return <PostCard key={v} post={v} />
        })
      }
    </div>
  );
};

export default Home;
