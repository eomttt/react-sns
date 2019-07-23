import React from 'react'; // eslint 에서 react 쓰면 import 하라고 명시됨
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Link href="/about"><a>about</a></Link>
      <div>
        Hello, Next!
      </div>
    </>
  );
};

export default Home;
