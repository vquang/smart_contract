import React, { Component } from 'react';
import Show from './Show';


class Main extends Component {

  constructor() {
    super();
    this.state = {
      showDetail: false,
      index: null
    };
  }
  setShowDetailFalse = () => {
    this.setState({
      showDetail: false
    });
  };
  setShowDetailTrue = () => {
    this.setState({
      showDetail: true
    });
  };
  render() {
    return (
      <div>
        < div className="product-body d-flex justify-content-start" style={{ height: "auto", width: "100%", flexWrap: "wrap" }} >
          {
            this.props.products.map((product, key) => {
              return (
                <div style={{ width: "20%" }}>
                  <div className="card mb-3 ml-4" style={{borderRadius: '20px', border: "7px outset rgb(204, 51, 255)"}}>
                    <div className="card-body">
                      <img className="card-img-top"
                        src={product.image} alt="Card image" style={{ width: "100%", height: "300" }} />
                      <div className="d-flex justify-content-around">
                        <h4 className="card-title">{product.name}</h4>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-around">
                      <button className='btn btn-success'
                        name={product.id}
                        onClick={(event) => {
                          this.setShowDetailTrue()
                          this.setState({
                            index: event.target.name
                          });
                        }}>Xem chi tiết</button>

                    </div>
                    {
                      this.state.showDetail
                        ? <Show product={this.props.products[this.state.index - 1]}
                          purchaseProduct={this.props.purchaseProduct}
                          setShowDetailFalse={this.setShowDetailFalse}
                        />
                        : null
                    }
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Main;