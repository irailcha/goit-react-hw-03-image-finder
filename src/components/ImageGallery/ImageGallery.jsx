
import React from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";


const ImageGallery=({images})=>{

return(
    <ul className="gallery">
{images.map(image =>
    (<ImageGalleryItem key={image.id} {...images} />))} 
    
    
</ul>





)}


export default ImageGallery;