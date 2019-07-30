import React from 'react';
import { Form, Input, Button } from 'antd'

const NicknameEditForm = () => {
  return (
    <Form style={{ marginTop: '20px'}}>
      <Input style={{ marginBottom: '10px' }} addonBefore="닉네임"/>
      <Button type="primary">Change</Button>
    </Form>
    )
  };
  
  export default NicknameEditForm;