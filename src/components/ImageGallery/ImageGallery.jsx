import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { nanoid } from 'nanoid';

const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map((image) => (
  <ImageGalleryItem
    key={nanoid()}
    src={image.webformatURL}
    alt={`Image ${image.id}`}
  />
))}

    </ul>
  );
};

export default ImageGallery;
