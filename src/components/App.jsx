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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imagesName !== this.state.imagesName ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = imagesName => {
    this.setState({
      imagesName,
      imagesArray: [],
      hits: 0,
      page: 1,
      status: 'pending',
    });
  };

  fetchImages = () => {
    const KEY = '36895134-9b9dfb2f5d96a62d5aae70f5d';
    const fetchBaseLink = 'https://pixabay.com/api/';

    const { imagesName, page } = this.state;

    fetch(
      ` ${fetchBaseLink}?q=${imagesName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data.hits.length);
        // console.log(data.totalHits);
        // console.log(data.hits);

        this.setState(
          prevState => ({
            imagesArray: [...prevState.imagesArray, ...data.hits],
            hits: prevState.hits + data.hits.length,
            totalHits: data.totalHits,
            status: 'resolved',
          }),
          () => {
            console.log(this.state.imagesArray.length);
          }
        );
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
