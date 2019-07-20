import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    selectedSort: '',
    filterValue: 'All'
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
    return this.state.stocks && this.state.stocks.length > 0 ? this.state.stocks.filter(stock => stock.owned === true) : null
  }

  alphaSort(stockA, stockB) {
    return stockA.name.localeCompare(stockB.name)
    // if (stockA.name < stockB.name) {
    //   return -1;
    // }
    // if (stockA.name > stockB.name) {
    //   return 1;
    // }
    // return 0;
  }

  priceSort(stockA, stockB) {
    return stockB.price - stockA.price
  }

  handleSelect = e => {
    this.setState({
      selectedSort: e.target.value
    }, () => this.sortStocks())
  }

  sortByRadio(sortMethod) {
    let sortedStocks = this.state.stocks.sort(sortMethod)
    this.setState({
      stocks: sortedStocks
    })
  }

  sortStocks() {
    if (this.state.selectedSort==='Alphabetically') {
      this.sortByRadio(this.alphaSort)
    } else if (this.state.selectedSort==='Price') {
      this.sortByRadio(this.priceSort)
    }  
  }

  handleChange = e => {
    this.setState({
      filterValue: e.target.value
    }, () => this.filterStocks())
  }

  filterStocks() {
    console.log("filtering");
    return this.state.filterValue === 'All' ? this.state.stocks : this.state.stocks.filter(stock => stock.type === this.state.filterValue)
  }



  render() {
    return (
      <div>
        <SearchBar selectedSort={this.state.selectedSort} handleSelect={this.handleSelect} handleChange={this.handleChange}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={ this.filterStocks() } handleClick={ this.handleClick }/>

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
