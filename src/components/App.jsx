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
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
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
    this.setState({
      searchQuery,
      currentPage: 1,
      images: [],
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          showBtn: currentPage < Math.ceil(data.totalHits / 12),
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

  incrementPage() {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  }

  render() {
    const { images, isLoading, isModalOpen, modalImageURL, showBtn } =
      this.state;

    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {isLoading && <Loader />}
        {showBtn && (
          <Button
            onLoadMore={() => this.incrementPage()}
            hasMore={!isLoading}
          />
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
