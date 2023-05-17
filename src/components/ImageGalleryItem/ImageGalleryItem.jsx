import React from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => (
  <li className={style.item}>
    <img
      src={webformatURL}
      alt={tags}
      className={style.itemImage}
      onClick={onClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
ImageGalleryItem.defaultProps = {
  tags: '',
};

export default ImageGalleryItem;
