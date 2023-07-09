import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ selectedImage, closeModal }) => {
  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={selectedImage} alt="" width={500} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
