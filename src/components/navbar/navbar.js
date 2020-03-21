import React, { Component } from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      menu: [{ id:"list", item:"My List", state:"active", href:"/todo-list" },
      { id:"edit", item:"Edit List", state:"", href:"/edit-list" }]
    };
    this.checkActiveButton()
  }

  checkActiveButton = () => {
    const index = this.state.menu.findIndex(item => item.href == window.location.pathname);
    if(index>=0)
      this.changePage(index)
  }

  changePage = (i) => {
    let menu = this.state.menu;
    menu.map((l,j) => l.state = i===j ? 'active' : ''); 
    this.setState({menu:menu});
  }
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand"><FontAwesomeIcon icon={faList} /></a>
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