import React, { Component } from "react";
import list from "../../storage/list.json"
import '../edit-list/edit-list.scss';

export default class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = { list: list }
    }
    addItem = () => {
        const newObj = {"id": this.state.list.length+1,"value":"new element"}
        debugger
        this.setState({ list: [...this.state.list,newObj] })
    }
    removeItem = (id) => {
        this.setState({
            list: this.state.list.filter(item => item.id != id)
          })
    }
    render() {
        return (
            <div>
                <div className="container padding">
                    <div className="row">
                        <div className="col-sm center-block text-center">
                            <button onClick={this.addItem} type="button" className="btn btn-info">Add</button>
                        </div>
                    </div>
                </div>
                <ul className="list-group ">
                    {this.state.list.map(l => <li key={l.id} className="list-group-item" data-toggle="modal" data-target="#editModal">{l.value}
                        <div className="btn-group pull-right"><button onClick={this.removeItem.bind(this,l.id)} className="delete btn btn-warning">Delete</button></div>
                    </li>)}
                </ul>
            </div>
        );
    }
}