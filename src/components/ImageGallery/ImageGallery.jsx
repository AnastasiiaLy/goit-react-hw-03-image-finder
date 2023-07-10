import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';

import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    selectedImage: '',
    showModal: false,
  };

  openModal = selectedPic => {
    this.setState({
      selectedImage: selectedPic,
      showModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      selectedImage: '',
      showModal: false,
    });
  };

  render() {
    const { imagesArray, error, status, hits, totalHits, onLoadMore } =
      this.props;
    const { selectedImage, showModal } = this.state;

    if (status === 'pending') {
      return <ThreeDots color="#ba90c6" wrapperClassName={css.loader} />;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.gallery}>
            {imagesArray.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={this.openModal}
              />
            ))}
          </ul>
          {showModal && (
            <Modal
              selectedImage={selectedImage}
              closeModal={this.onCloseModal}
            />
          )}
          {hits < totalHits && (
            <button
              type="button"
              onClick={onLoadMore}
              className={css.LoadMoreBtn}
            >
              Load More
            </button>
          )}
          {hits === totalHits && (
            <p className={css.noImagesNotify}>There are no images here</p>
          )}
        </>
      );
    }

    return null;
  }
}

ImageGallery.propTypes = {
  imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.object,
  status: PropTypes.oneOf(['idle', 'pending', 'rejected', 'resolved'])
    .isRequired,
  hits: PropTypes.number.isRequired,
  totalHits: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
