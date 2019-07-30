import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'; // With redux in next
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux'

import reducers from '../reducers';
import AppLayout from '../components/AppLayout';
import { initialState } from '../reducers/user';

const NodeBird = ({ Component, store }) => {
  // Using Provider link react with redux
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.5/antd.css"/>
      </Head>
      <AppLayout>
        <Component/>
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object
}

export default withRedux((initialState, options) => {
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // For debuggin redux
  );

  const store = createStore(reducers, initialState, enhancer); // Create redux store
  return store;
})(NodeBird);
