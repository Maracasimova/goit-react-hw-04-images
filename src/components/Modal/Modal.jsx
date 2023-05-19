import React, { useState, useEffect } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        handleCloseModal();
      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      onClose();
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onClose]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  }

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className={style.overlay} onClick={handleOverlayClick}>
          <div className={style.modal}>
            <img src={imageUrl} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Modal;
