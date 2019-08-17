import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card, Avatar, Icon, Button } from 'antd';

import * as actions from '../reducers/post';

import PostCardContent from './Content';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [commentOpened, setCommentOpened] = useState(false);

  const liked = me && post.likers && post.likers.find(liker => liker === me.userId);

  const onToggleComment = () => {
    if (!commentOpened) {
      dispatch(actions.loadCommentRequest(post._id));
    }
    setCommentOpened(prev => !prev);
  };

  const onToggleLike = () => {
    if (!me) {
      return alert('Please login');
    }

    if (liked) {
      return dispatch(actions.unLikePostRequest(post._id));
    }

    return dispatch(actions.likePostRequest(post._id));
  };

  return (
    <div style={{ marginTop: '2em' }}>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike} />,
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
      <PostImages images={post.images} />
      {
        commentOpened && (
          <>
            <CommentForm postId={post._id} />
            <CommentList commentList={post.comments || []} />
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
    _id: PropTypes.string,
    comments: PropTypes.array,
    images: PropTypes.array,
    likers: PropTypes.array,
  }).isRequired,
};

export default PostCard;
