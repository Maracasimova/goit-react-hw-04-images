import React, { useState } from 'react';
import style from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className={style.searchbar}>
      <form onSubmit={handleSubmit} className={style.form}>
        <button type="submit" className={style.button}>
          <span className={style.buttonLabel}>Search</span>
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;