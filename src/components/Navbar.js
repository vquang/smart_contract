import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow" style={{backgroundColor:'rgb(119, 0, 179)'}}>
        <span
          className="navbar-brand col-sm-3 col-md-2 mr-0"
        >
          Nhóm 2
        </span>
        <ul className="navbar-nav p-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;