import React from 'react'; // eslint 에서 react 쓰면 import 하라고 명시됨
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.5/antd.css"/>
      </Head>
      <AppLayout>
        <Link href="/about"><a>about</a></Link>
        <div>
          Hello, Next!
        </div>
      </AppLayout>
    </>
  );
};

export default Home;
