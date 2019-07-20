import React from 'react';

// allow a user to sort the list of stocks alphabetically by the ticker name as well as by ascending price.
// allow a user to filter stocks based on the type of the stock.

const SearchBar = ({handleSelect, handleChange, selectedSort}) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={selectedSort==="Alphabetically" ? true : false} onChange={e => handleSelect(e)}/>
        Alphabetically
      </label>

      <label>
        <input type="radio" value="Price" checked={selectedSort==="Price" ? true : false}  onChange={e => handleSelect(e)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={e => handleChange(e)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
