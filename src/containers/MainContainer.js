import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    selectedSort: ''
  };

  componentDidMount() {
    const getAllStocks = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const resp = await fetch('http://localhost:3000/stocks', { headers: headers });
        const jsonData = await resp.json();
        this.setState({
          stocks: [...this.state.stocks, ...jsonData]
        });
    };

    getAllStocks();
  };

  handleClick = e => {
    // set stock value of purchased to true or false
    e.persist()
    const selectedStock = this.state.stocks.find(stock => stock.id === parseInt(e.target.id))
    const selectedStockIndex = this.state.stocks.indexOf(selectedStock)
    selectedStock.owned === true ? selectedStock.owned = false : selectedStock.owned = true
    this.setState({
      stocks: [...this.state.stocks.slice(0, selectedStockIndex), ...selectedStock, ...this.state.stocks.slice(selectedStockIndex)]
    })
  }

  filterPortfolio() {
    console.log("filtering", this.state.stocks)
    return this.state.stocks && this.state.stocks.length > 0 ? this.state.stocks.filter(stock => stock.owned === true) : null
  }

  sortStocks = e => {
    this.setState({
      selectedSort: e.target.value
    }, () => console.log(this.state))
  }


  render() {
    return (
      <div>
        <SearchBar selectedSort={this.state.selectedSort} sortStocks={this.sortStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={ this.state.stocks } handleClick={ this.handleClick }/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={ this.filterPortfolio() }/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
