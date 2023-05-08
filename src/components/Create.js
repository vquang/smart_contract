import React, { Component } from 'react';

class Create extends Component {
    render() {
        return (
            <div className="container-fluid fixed-top h-100 base-form" style={{ backgroundColor: "rgba(77, 77, 77, 0.5)" }}>
                <div className="row mt-5">
                    <div className="col-4"></div>
                    <div className="col-4" style={{ backgroundColor: "#ffffff",borderRadius: '20px', border: "7px outset rgb(204, 51, 255)" }}>
                        <button type="button" class="btn btn-danger mt-3" 
                        onClick={(event) => {
                            this.props.setShowCreateFalse()
                        }}>X</button>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            const name = this.productName.value
                            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                            const image = this.productImage
                            this.props.createProduct(name, price, image)
                        }}>
                            <div className="form-group mt-3">
                                <label for="productName">Tên Sản Phẩm:</label>
                                <input
                                    id="productName"
                                    ref={(input) => { this.productName = input }}
                                    type="text"
                                    className="form-control"
                                    placeholder="tên sản phẩm"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label for="productPrice">Giá Tiền:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productPrice"
                                    placeholder="giá tiền"
                                    ref={(input) => { this.productPrice = input }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label for="productImage">Link ảnh:</label>
                                <br></br>
                                <input
                                    id="productImage"
                                    type="file"
                                    onChange={(e) => {
                                        const reader = new FileReader()
                                        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
                                        reader.onload = (readerEvent) => {
                                            const file = readerEvent.target.result
                                            console.log(typeof file)
                                            this.productImage = file
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100 add-bt mb-3">Thêm sản phẩm</button>
                        </form>
                    </div >
                </div>
                <div className="col-4"></div>
            </div>
        )
    }
}

export default Create;