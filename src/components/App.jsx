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

async componentDidMount(){ 
const savedQuery=localStorage.getItem('save-query');
if(savedQuery!==null){
this.setState({query:JSON.parse(savedQuery)
})
}

try {
  this.state({loading: true});
  const imagesSet=await AllImages();

  this.setState({images:imagesSet});
} catch (error) {
  
}
finally{
  this.setState({loading:false})
}

   } 


componentDidUpdate(prevProps, prevState){ 
  if(this.state.page !== prevState.page || this.state.query!== prevState.query ){ 
    this.setState((prevState) =>
      ({page: prevState.page+1}));
  
} }

handleClick = (evt) => {
  evt.preventDefault();
  const query = evt.target.elements.query;
  this.setState({ query, images: [], page: 1 });
}


    handleLoader=(evt)=>{
      evt.preventDefault();
      this.setState((prevState) =>
      ({page: prevState.page+1}))
    }


render () {

return(
  <div>
<Searchbar onSubmit={this.handleClick}/>
  <ImageGallery images={this.state.images}/>

{ this.state.loading && <div>Loading...</div>}

<Button buttonLoader={this.handleLoader}/>
          {/* <Modal></Modal>   */}
<GlobalStyle/>
          </div>

)}}


export default App;