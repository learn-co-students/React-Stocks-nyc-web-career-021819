import React from 'react'

const Stock = ({ stockData }) => (
  <div>

    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{
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
