import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd'

const PostForm = () => {
  const { imagePaths } = useSelector(state => state.post);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
      <Input.TextArea maxLength={140} placeholder="How was your day?" />
      <div>
        <input type="file" multiple hidden />
        <Button>Upload Image</Button>
        <Button type="primary" htmlType="submit">TWIT</Button>
      </div>
      <div>
        {
          imagePaths.map(v => (
            <div key={v}>
              <img src={`http://localhost:3000/${v}`} alt={v} />
              <div>
                <Button>Remove</Button>
              </div>
            </div>
          ))
        }
      </div>
    </Form>
  );
};

export default PostForm;
