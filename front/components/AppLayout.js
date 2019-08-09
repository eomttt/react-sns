import React from 'react';
import { useSelector } from 'react-redux'
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const AppLayout = ({ children }) => {
  // Get from store
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/">NodeBird</Link></Menu.Item>
        <Menu.Item key="profile"><Link href="1/profile">Profile</Link></Menu.Item>
        <Menu.Item key="mail"><Input.Search enterButton style={{ verticalAlign: 'middle' }} /></Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {
            isLoggedIn ? <UserProfile /> : <LoginForm />
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
