import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import style from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');

  const fetchImages = useCallback(() => {
    const options = {
      searchQuery,
      currentPage,
    };

    setIsLoading(true);

    fetchImages(options)
      .then(newImages => {
        setImages(prevImages => [...prevImages, ...newImages]);
        setCurrentPage(prevPage => prevPage + 1);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (searchQuery !== '' && images.length > 0) {
      fetchImages();
    }
  }, [searchQuery, images, fetchImages]);

 const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const onImageClick = modalImageURL => {
    setModalImageURL(modalImageURL);
    setIsModalOpen(true);
  };

  const onChangeQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setImages([]);
    fetchImages();
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <div className={style.App}>
        <Searchbar onSubmit={onChangeQuery} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={onImageClick} />
        )}

        {isLoading && <Loader />}
        {shouldRenderLoadMoreButton && (
          <Button onLoadMore={fetchImages} hasMore={!isLoading} />
        )}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={toggleModal}
            imageUrl={modalImageURL}
          >
            <img src={modalImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }

export default App;
