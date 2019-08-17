/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImagesZoom from './ImageZoom';


const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  return (
    <>
      {
      images && (
      <div>
        <img src={`http://localhost:8080/${images[0]}`} width="50%" onClick={onZoom} alt={images[0]} />
        <div style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }} onClick={onZoom}>
          <Icon type="plus" />
          <br />
          {`${images.length - 1} showMore`}
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
      )
    }

    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.array.isRequired,
};

export default PostImages;
