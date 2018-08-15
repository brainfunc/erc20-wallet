import React, { Component } from 'react';
import config from "./config";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: 0x00,
      balance: 0,
      tokens: 0
    }

    this.setWalletAddress = this.setWalletAddress.bind(this);
    this.setEtherBalance = this.setEtherBalance.bind(this);
    this.setBFTTokenBalance = this.setBFTTokenBalance.bind(this);
    this.refreshState = this.refreshState.bind(this);
  }

  setWalletAddress() {
    this.setState({
      address: window.web3.eth.defaultAccount
    })
  }

  setBFTTokenBalance() {
    const contract = window.web3.eth.contract(config.contractAbi)
    .at(config.contractAddress, (err, ctr) => {});
    if(!window.web3.eth.defaultAccount) { return }
    contract.balanceOf(window.web3.eth.accounts[0], (err, tkns) => {
      if (!err) {
        this.setState({
          tokens : window.web3.fromWei(tkns, 'ether').toNumber()
        })
      }
      console.log(err)
    })
  }

  setEtherBalance() {
    const contract = window.web3.eth.contract(config.contractAbi)
    .at(config.contractAddress, (err, ctr) => {});
    if(!window.web3.eth.defaultAccount) { return }
    contract._eth.getBalance(window.web3.eth.accounts[0], (err, bal) => {
      if (!err) {
        this.setState({
          balance: window.web3.fromWei(bal, 'ether').toNumber()
        })
      }
      console.log(err)
    })
  }

  componentDidMount() {
    this.refreshState()
  }

  refreshState() {
    this.setWalletAddress();
    this.setEtherBalance();
    this.setBFTTokenBalance();
  }

  render() {
    return (
      <div className='container'>
        <h1> Basic ERC20 Wallet - BrainFunc Token </h1>
        <div className='details'>
          <b> Wallet Address: </b> { this.state.address } <br/>
          <b> Ether Address: </b> { this.state.balance } <br/>
          <b> BFT Token Balance: </b> { this.state.tokens } <br/>
        </div>
        <button onClick= { this.refreshState }> Refresh </button>
      </div>
    );
  }
}

export default App;
