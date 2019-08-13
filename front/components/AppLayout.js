import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

import * as userActions from '../reducers/user';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  // Get from store
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(userActions.loadUserReuqestAction());
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/">NodeBird</Link></Menu.Item>
        <Menu.Item key="profile"><Link href="profile">Profile</Link></Menu.Item>
        <Menu.Item key="mail"><Input.Search enterButton style={{ verticalAlign: 'middle' }} /></Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {
            me ? <UserProfile /> : <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}><a href="https://www.zerocho.com" target="_blank" rel="noopener noreferrer">Made by ZeroCho</a></Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
