import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { nanoid } from 'nanoid';

import './ImageGallery.styled';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery className="gallery">
      {images.map((image) => (
  <ImageGalleryItem
    key={nanoid()}
    src={image.webformatURL}
    alt={`Image ${image.id}`}
    onClick={() => onClick(image.largeImageURL)}
  />
))}

    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelectImage: PropTypes.func.isRequired,
};

export default ImageGallery;
