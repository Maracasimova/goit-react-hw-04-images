import React, { useEffect } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose, imageUrl }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={style.overlay} onClick={handleOverlayClick}>
        <div className={style.modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Modal;
