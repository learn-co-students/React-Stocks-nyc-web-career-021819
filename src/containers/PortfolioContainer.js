import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderAllStocks() {
    return this.props.stocks.map(stock => {
      return <Stock stockData={stock} key={stock.id}/>
    })
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {
          this.props.stocks.length > 0 ? this.renderAllStocks() : null
        }
      </div>
    );
  }

}

export default PortfolioContainer;
