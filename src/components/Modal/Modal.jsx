import React from 'react';
import PropTypes from 'prop-types';
import './Modal.styled';
import {Overlay, ModalStyle} from "./Modal.styled";


const Modal =({selectedImage, onClose})=>{

    return (
        <Overlay className="Overlay" onClick={onClose}>
  <ModalStyle className="modal">
  <img src={selectedImage} alt="Large preview" />

  </ModalStyle>
</Overlay>
    )
}

Modal.propTypes = {
    selectedImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default Modal;