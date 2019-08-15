import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';

const UserProfile = ({ userData }) => {
  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />
            {userData.posts.length}
          </div>,
          <div key="following">
            팔로잉
            <br />
            {userData.followings.length}
          </div>,
          <div key="follower">
            팔로워
            <br />
            {userData.followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{userData.nickname[0]}</Avatar>}
          title={userData.nickname}
        />
      </Card>
    </div>
  );
};

UserProfile.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserProfile;
