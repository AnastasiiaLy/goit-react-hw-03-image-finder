import { Component } from 'react';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    imagesName: '',
  };

  handleSearchSubmit = imagesName => {
    this.setState({ imagesName });
    console.log(imagesName);
  };
  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery imagesName={this.state.imagesName} />
      </div>
    );
  }
}
