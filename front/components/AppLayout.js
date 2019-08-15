
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col, Button } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

import * as userActions from '../reducers/user';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  // Get from store
  const { me, isLoggingOut } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(userActions.loadUserReuqestAction());
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logoutRequestAction());
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a>NodeBird</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/profile"><a>Profile</a></Link></Menu.Item>
        <Menu.Item key="mail"><Input.Search enterButton style={{ verticalAlign: 'middle' }} /></Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {
            me
              ? (
                <div>
                  <UserProfile userData={me} />
                  <Button style={{ marginTop: '.5em', float: 'right' }} onClick={onLogout} loading={isLoggingOut}>LogOut</Button>
                </div>
              )
              : <LoginForm />
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
