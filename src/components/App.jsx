import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getImagesFromAPI from './pixabayAPI';
import style from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = () => {
      const options = {
        searchQuery,
        currentPage,
      };

      setIsLoading(true);

      getImagesFromAPI(options)
        .then(data => {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setShowBtn(
            prevShowBtn => currentPage < Math.ceil(data.totalHits / 12)
          );
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  const onImageClick = modalImageURL => {
    setModalImageURL(modalImageURL);
    setIsModalOpen(true);
  };

  const onChangeQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={onChangeQuery} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {isLoading && <Loader />}
      {showBtn && (
        <Button onLoadMore={() => incrementPage()} hasMore={!isLoading} />
      )}
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          imageUrl={typeof modalImageURL === 'string' ? modalImageURL : ''}
        >
          <img src={modalImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;
