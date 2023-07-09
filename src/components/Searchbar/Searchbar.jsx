import { Component } from 'react';
import { Notify } from 'notiflix';
import { BsSearchHeart } from 'react-icons/bs';
import css from './Searchbar.module.css';

export default class SearchBar extends Component {
  state = {
    imagesName: '',
  };

  handleNameChange = event => {
    this.setState({ imagesName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imagesName.trim() === '') {
      // return alert('');
      return Notify.failure('Please enter your name of the images');
    }
    this.props.onSubmit(this.state.imagesName);
    this.setState({ imagesName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className="button-label">
              <BsSearchHeart />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imagesName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
