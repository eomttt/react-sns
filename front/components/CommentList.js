import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Avatar, List, Comment } from 'antd';

import CommentContent from './Content';

const CommentList = ({ commentList }) => (
  <>
    {
       commentList && (
       <List
         header={`${commentList ? commentList.length : 0} 댓글`}
         itemLayout="horizontal"
         dataSource={commentList || []}
         renderItem={item => (
           <li>
             <Comment
               author={item.user.nickname[0]}
               avatar={<Link href="/user/[userid]" as={`/user/${item.user.userId[0]}`}><a><Avatar>{item.user.nickname[0][0]}</Avatar></a></Link>}
               content={<CommentContent content={item.content} />}
             />
           </li>
         )}
       />
       )
     }
  </>
);

CommentList.propTypes = {
  commentList: PropTypes.array.isRequired,
};

export default CommentList;
