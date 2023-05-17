import React from 'react';
import style from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore, hasMore }) => {
  const handleClick = () => {
    if (hasMore) {
      onLoadMore();
    }
  };

  if (!hasMore) {
    return null;
  }

  return (
    <button type="button" onClick={handleClick} className={style.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default Button;
