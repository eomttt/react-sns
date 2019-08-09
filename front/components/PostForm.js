import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import * as actions from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);

  const [text, setText] = useState('');

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(actions.addPostRequest({
      text,
    }));
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="How was your day?" value={text} onChange={onChangeText} />
      <div>
        <input type="file" multiple hidden />
        <Button>Upload Image</Button>
        <Button type="primary" htmlType="submit" loading={isAddingPost}>TWIT</Button>
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
