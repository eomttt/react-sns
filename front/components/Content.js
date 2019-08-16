import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


const PostCardContent = ({ content }) => (
  <>
    {
      content.split(/(#[^\s]+)/g).map((value, index) => (value.match(/#[^\s]+/g) ? <Link href="/hashtag/[tag]" as={`/hashtag/${value.slice(1)}`} key={value + index}><a>{value}</a></Link> : value))
    }
  </>
);

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
