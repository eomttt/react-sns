import React, { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { Card, Avatar, Icon, Button } from 'antd';

import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const PostCard = ({ post }) => {
  const [commentOpened, setCommentOpened] = useState(false);

  const onToggleComment = () => {
    setCommentOpened(prev => !prev);
  };

  return (
    <div style={{ marginTop: '2em' }}>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={<Link href="/user/[userid]" as={`/user/${post.user.userId[0]}`}><a><Avatar>{post.user.nickname[0][0]}</Avatar></a></Link>}
          title={post.user.nickname[0]}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {
        commentOpened && (
          <>
            <CommentForm postId={post.id} />
            <CommentList commentList={post.Comments} />
          </>
        )
      }
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
    id: PropTypes.number,
    Comments: PropTypes.array,
  }).isRequired,
};

export default PostCard;
