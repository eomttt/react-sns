import React, { useEffect } from 'react';
import { List, Card, Icon, Button } from 'antd';

import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  useEffect(() => {
    console.log('Rendered profile page');
  }, []);

  return (
    <>
      <NicknameEditForm />
      <List
        style={{ marginTop: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>Following</div>}
        dataSource={['Following_1', 'Following_2', 'Following_3']}
        loadMore={<Button style={{ width: '100%' }}>LoadMore</Button>}
        bordered
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<Icon key="stop" type="stop" />]}><Card.Meta description={item} /></Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginTop: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        header={<div>Follower</div>}
        dataSource={['Follower_1', 'Follower_2', 'Follower_3']}
        loadMore={<Button style={{ width: '100%' }}>LoadMore</Button>}
        bordered
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<Icon key="stop" type="stop" />]}><Card.Meta description={item} /></Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Profile;
