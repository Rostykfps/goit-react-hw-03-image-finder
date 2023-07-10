import React, { Component } from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import * as API from '../services/apiService';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Container } from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoadMore: false,
    isLoader: false,
    isShowModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, per_page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoader: true });
      this.getImages(searchQuery, page, per_page);
    }
  }

  handleSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  getImages = async (query, page, per_page) => {
    try {
      const { hits, totalHits } = await API.getData(query, page, per_page);

      if (hits.length === 0) {
        this.setState({ isLoader: false });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isLoadMore: page < Math.ceil(totalHits / per_page),
        isLoader: false,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = largeImage => {
    this.setState({
      isShowModal: true,
      largeImageURL: largeImage,
    });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { images, isLoadMore, isLoader, isShowModal, largeImageURL } =
      this.state;
    return (
      <>
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery images={images} onClick={this.showModal} />
          {isLoadMore && <Button onClick={this.loadMore} />}
          {isLoader && <Loader />}
          {isShowModal && (
            <Modal largeImage={largeImageURL} onClose={this.closeModal} />
          )}
        </Container>
      </>
    );
  }
}

export default App;
