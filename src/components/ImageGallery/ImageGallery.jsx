import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';

import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    imagesArray: [],
    page: 1,
    imagesName: '',

    selectedImage: '',
    showModal: false,
    hits: 0,
    totalHits: 0,

    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imagesName !== this.props.imagesName) {
      this.setState({
        imagesArray: [],
        page: 1,
        imagesName: this.props.imagesName,
        status: 'pending',
      });

      const KEY = '36895134-9b9dfb2f5d96a62d5aae70f5d';
      const fecthBaseLink = 'https://pixabay.com/api/';

      fetch(
        `${fecthBaseLink}?q=${this.props.imagesName}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=1`
      )
        .then(response => response.json())
        .then(data =>
          this.setState({
            imagesArray: data.hits,
            status: 'resolved',
            hits: data.hits.length,
            totalHits: data.totalHits,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreImages = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        const KEY = '36895134-9b9dfb2f5d96a62d5aae70f5d';
        const fecthBaseLink = 'https://pixabay.com/api/';

        fetch(
          `${fecthBaseLink}?q=${this.props.imagesName}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
        )
          .then(response => response.json())
          .then(data =>
            this.setState(prevState => ({
              imagesArray: [...prevState.imagesArray, ...data.hits],
              hits: prevState.hits + data.hits.length,
              totalHits: data.totalHits,
            }))
          );
      }
    );
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.onCloseModal();
    }
  };

  render() {
    const {
      imagesArray,
      error,
      status,
      showModal,
      selectedImage,
      hits,
      totalHits,
    } = this.state;

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
              onClick={this.loadMoreImages}
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

    return <></>;
  }
}
