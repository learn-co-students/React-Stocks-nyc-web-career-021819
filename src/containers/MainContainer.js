import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: {}
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


  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.stocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
