import React from 'react'; // eslint 에서 react 쓰면 import 하라고 명시됨

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const mock = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'MockNickName',
    },
    content: 'First card',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

const Home = () => {
  return (
    <>
      <div>
        {mock.isLoggedIn && <PostForm imagePaths={mock.imagePath}/>}
        {
          mock.mainPosts.map((v) => {
            return <PostCard key={v} post={v} />
          })
        }
      </div>
    </>
  );
};

export default Home;
