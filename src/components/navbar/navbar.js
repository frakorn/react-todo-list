import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      menu: [{ id:"list", item:"My List", state:"active", href:"/todo-list" },
      { id:"edit", item:"Edit List", state:"", href:"/edit-list" }]
    };
  }

  changePage = (i) => {
    let menu = this.state.menu;
    menu.map((l,j) => l.state = i===j ? 'active' : ''); 
    this.setState({menu:menu});
  }
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand">TODO LIST</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {this.state.menu.map((l,i) =>
              <li key={l.id}  className={"nav-item " + l.state}>
                <Link className="nav-item nav-link" onClick={this.changePage.bind(this,i)} to={l.href}>{l.item}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}