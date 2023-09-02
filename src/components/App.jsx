import React from 'react';
import {AllImages} from "../api";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from "./ImageGallery/ImageGallery";
// import Loader from "./Loader/Loader";
import Button from "./Button/Button";
// import Modal from "./Modal/Modal";
import GlobalStyle from './GlobalStyle';


class App extends React.Component{
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,

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
      
      return "Error";
    } finally {
      this.setState({ loading: false });
    }
  }
  


   componentDidUpdate(prevProps, prevState) { 
    if (
      (prevState.query !== this.state.query ||
         prevState.page !== this.state.page )
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
    this.setState((prevState) => ({
      images: [...prevState.images, ...imagesSet],
    }));
  } catch (error) {
  
  }
};

    handleLoader=(evt)=>{
      evt.preventDefault();
      this.setState((prevState) =>
      ({page: prevState.page+1}))
    }


    render() {
      const { loading, images, query} = this.state;
      return (
        <div>
          <Searchbar onSubmit={this.handleClick} />
          {query !== '' && <ImageGallery images={images} />}
          {loading && <div>Loading...</div>}
          <Button buttonLoadMore={this.handleLoader} />
          <GlobalStyle />
        </div>
      );
    }
    
  }

export default App;