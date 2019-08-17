import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import * as actions from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
  const imageInput = useRef();

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
      images: imagePaths,
    }));
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onChangeImages = (e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch(actions.uploadImagesRequest(imageFormData));
  };

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="How was your day?" value={text} onChange={onChangeText} />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>Upload Image</Button>
        <Button style={{ float: 'right' }} type="primary" htmlType="submit" loading={isAddingPost}>TWIT</Button>
      </div>
      <div>
        {
          imagePaths.map(v => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:8080/${v}`} style={{ width: '200px' }} alt={v} />
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
