import React, { Component } from 'react';

class Show extends Component {
    render() {
        return (
            <div className="container-fluid fixed-top h-100 base-form" style={{ backgroundColor: "rgba(77, 77, 77, 0.2)" }}>
                <div className="row mt-5">
                    <div className="col-4"></div>
                    <div className="col-4 " style={{ backgroundColor: "#ffffff", borderRadius: '20px', border: "7px outset rgb(204, 51, 255)" }}>
                        <button type="button" class="btn btn-danger mt-3"
                            onClick={(event) => {
                                this.props.setShowDetailFalse()
                            }}>X</button>
                        <div class='w-100 d-flex justify-content-around'>
                            <img className=""
                                src={this.props.product.image} alt="Card image" />
                        </div>
                        <div class='w-100 d-flex justify-content-around'><h4>{this.props.product.name}</h4></div>
                        <div class='w-100 d-flex justify-content-around'><h5>Giá tiền: <code className="card-text font-weight-bold">{window.web3.utils.fromWei(this.props.product.price.toString(), 'Ether')} ETH</code></h5></div>
                        <div class='w-100 d-flex justify-content-around'><h5><kbd>chủ sở hữu:</kbd></h5></div>
                        <div class='w-100 d-flex justify-content-around'><h5><code className='font-weight-bold'>{this.props.product.owner}</code></h5></div>
                        <div class='w-100 d-flex justify-content-around mb-3'>
                            {!this.props.product.purchased
                                ? <button
                                    style={{ width: "80%" }}
                                    className='btn btn-success'
                                    name={this.props.product.id}
                                    value={this.props.product.price}
                                    onClick={(event) => {
                                        this.props.purchaseProduct(event.target.name, event.target.value)
                                    }}
                                >
                                    Mua hàng
                                </button >
                                : <button style={{ width: "80%" }} className='btn btn-danger'>đã mua</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Show;