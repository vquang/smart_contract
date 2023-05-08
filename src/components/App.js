import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar'
import Main from './Main'
import Create from './Create'
import banner from "../image/banner.jpg";

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
      // console.log(productCount.toString())
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true,
      showCreate: false
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)

    this.setShowCreateTrue = this.setShowCreateTrue.bind(this)
    this.setShowCreateFalse = this.setShowCreateFalse.bind(this)
  }
  setShowCreateTrue() {
    this.setState({ showCreate: true })
  }
  setShowCreateFalse() {
    this.setState({ showCreate: false })
  }

  createProduct(name, price, image) {
    this.setState({ loading: true })
    this.setState({ showCreate: false })
    this.state.marketplace.methods.createProduct(name, price, image).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }


  render() {
    return (
      <div style={{backgroundImage:'linear-gradient(45deg, rgb(204, 102, 255), rgb(255, 51, 204)'}}>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5" >
          <div className='row'>
            <img src={banner} alt="hello" style={{width:'95%', height:'300px', margin:'auto', borderRadius: '20px', marginTop:'10px'}}/>
          </div>
          <div className='row'>
            <div className="col-1">
              <button type="button" className="btn btn-success m-4" style={{width: '200px'}}
                onClick={(even) => {
                  this.setShowCreateTrue()
                }}>Thêm sản phẩm</button>
            </div>
          </div>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading
                ? <div id="loader" className="text-center"style={{height:'1000px'}}><p className="text-center">Loading...</p></div>
                : <Main
                  products={this.state.products}
                  purchaseProduct={this.purchaseProduct} />
              }
              {this.state.showCreate ? <Create
                createProduct={this.createProduct}
                setShowCreateFalse={this.setShowCreateFalse} />
                : null
              }

            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
