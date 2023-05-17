import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from './pixabayAPI';
import style from './App.module.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    isModalOpen: false,
    modalImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery &&
      this.state.images.length > 0
    ) {
      this.fetchImages();
    }
  }

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  onImageClick = modalImageURL => {
    this.setState({
      modalImageURL,
      isModalOpen: true,
    });
  };

  onChangeQuery = searchQuery => {
    this.setState(
      {
        searchQuery,
        currentPage: 1,
        images: [],
      },
      () => {
        this.fetchImages();
      }
    );
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  render() {
    const { images, isLoading, isModalOpen, modalImageURL } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}

        {isLoading && <Loader />}
        {shouldRenderLoadMoreButton && (
          <Button onLoadMore={this.fetchImages} hasMore={!isLoading} />
        )}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={this.toggleModal}
            imageUrl={modalImageURL}
          >
            <img src={modalImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
