import React from 'react'

const Stock = ({ stockData, handleClick }) => (
  <div>

    <div className="card">
      <div className="card-body">
        <h5 className="card-title" id={stockData.id} onClick={e => handleClick(e)}>{
            //Company Name
           stockData.name
          }</h5>
        <p className="card-text">{
            //ticker: stock price
           stockData.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
