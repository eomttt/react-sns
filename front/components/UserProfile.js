import React from 'react';
import { Card, Avatar } from 'antd'

const mock = {
  nickname: 'MockNickName',
  Post: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false
};

const UserProfile = () => {
  return (
    <>
      <Card
        actions={[
          <div key="twit">짹짹<br />{mock.Post.length}</div>,
          <div key="following">팔로잉<br />{mock.Followings.length}</div>,
          <div key="follower">팔로워<br />{mock.Followers.length}</div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{mock.nickname[0]}</Avatar>}
          title={mock.nickname}
        />
      </Card>
    </>
    )
  }
  
  export default UserProfile;