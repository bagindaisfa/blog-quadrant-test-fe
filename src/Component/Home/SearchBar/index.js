import React from "react";
import "./styles.css";

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => (
  <div>
    <div className="searchBar-wrap">
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Keyword"
          value={value}
          onChange={handleSearchKey}
        />
        {value && <span onClick={clearSearch}>X</span>}
        <button>Go</button>
      </form>
    </div>
  </div>
);

export default SearchBar;
