import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, Comment } from 'antd';

const CommentList = ({ commentList }) => (
  <List
    header={`${commentList ? commentList.length : 0} 댓글`}
    itemLayout="horizontal"
    dataSource={commentList || []}
    renderItem={item => (
      <li>
        <Comment
          author={item.User.nickname}
          avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
          content={item.content}
        />
      </li>
    )}
  />
);

CommentList.propTypes = {
  commentList: PropTypes.array.isRequired,
};

export default CommentList;
