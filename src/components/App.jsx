import React, { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    imagesArray: [],
    imagesName: '',
    page: 1,
    hits: 0,
    totalHits: 0,
    error: null,
    status: 'idle',
  };

  handleSearchSubmit = imagesName => {
    this.setState(
      {
        imagesName,
        imagesArray: [],
        page: 1,
        status: 'pending',
      },
      this.fetchImages
    );
  };

  fetchImages = () => {
    const KEY = '36895134-9b9dfb2f5d96a62d5aae70f5d';
    const fecthBaseLink = 'https://pixabay.com/api/';

    const { imagesName, page } = this.state;

    fetch(
      `${fecthBaseLink}?q=${imagesName}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => ({
          imagesArray: [...prevState.imagesArray, ...data.hits],
          hits: prevState.hits + data.hits.length,
          totalHits: data.totalHits,
          status: 'resolved',
        }))
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  loadMoreImages = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  render() {
    const { imagesArray, error, status, hits, totalHits } = this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          imagesArray={imagesArray}
          error={error}
          status={status}
          hits={hits}
          totalHits={totalHits}
          onLoadMore={this.loadMoreImages}
        />
      </div>
    );
  }
}
