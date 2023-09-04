import React from 'react';
import { AllImages } from '../api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import GlobalStyle from './GlobalStyle';
import './App.styled';
import { AppStyle } from './App.styled';

class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    selectedImage: null,
    per_page: 12,
    loadMore: true,
    
  };

  async componentDidMount() {
    const savedQuery = localStorage.getItem('save-query');
    if (savedQuery !== null) {
      this.setState({ query: JSON.parse(savedQuery) });
    }

    try {
      this.setState({ loading: true });
      await this.fetchImages();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleClick = (evt) => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim();

    if (query !== '') {
      this.setState({ query, images: [], page: 1 }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    try {
      const imagesSet = await AllImages(query, page);
      const { images, totalHits } = imagesSet;
  
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        loadMore: prevState.page < Math.ceil(totalHits / prevState.per_page),
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  handleLoader = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  toggleModal = (selectedImage) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      selectedImage,
    }));
  };

  render() {
    const { loading, images, query, per_page, showModal, selectedImage, loadMore } = this.state;
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleClick} />
        {query !== '' && <ImageGallery images={images} onClick={this.toggleModal} />}
        {loading && <Loader />}
        {loadMore && per_page >= 13 && <Button buttonLoadMore={this.handleLoader} />}
        {showModal && (
          <Modal selectedImage={selectedImage} onClose={this.toggleModal} />
        )}
        <GlobalStyle />
      </AppStyle>
    );
  }
}

export default App;
