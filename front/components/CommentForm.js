import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import * as actions from '../reducers/post';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { isAddingComment, commentAdded } = useSelector(state => state.post);
  const [text, setText] = useState('');

  useEffect(() => {
    if (commentAdded) {
      setText('');
    }
  }, [commentAdded]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    
    if (!me) {
      return alert('Please login');
    }

    console.log(me.userId, postId, text);

    return dispatch(actions.addCommentRequest({
      userId: me.userId,
      postId,
      text,
    }));
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Item>
        <Input.TextArea rows={4} value={text} onChange={onChangeText} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isAddingComment}>Comment</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentForm;
