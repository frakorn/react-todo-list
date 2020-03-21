import React, { Component } from "react";
import list from "../../storage/list.json"
import '../edit-list/edit-list.scss';

export default class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = { list : JSON.parse(localStorage.getItem('list')) || list};
    }
    addItem = () => {
        const newObj = {
            "id": this.state.list.length + 1,
            "value": "new element"
        }
        this.setState({ list: [...this.state.list, newObj] })
    }
    removeItem = (id) => {
        this.setState({
            list: this.state.list.filter(item => item.id != id)
          })
    }
    editItem = (id,el) => {
        let list = this.state.list;
        list.map((l,j) => l.value = l.id===id ? el.target.value : l.value); 
        this.setState({list:list});
    }
    save = () => {
        localStorage.setItem('list', JSON.stringify(this.state.list));
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col align-right">
                        <button onClick={this.addItem} type="button" className="btn btn-info">Add</button>
                    </div>
                    <div className="col align-left">
                        <button onClick={this.save} type="button" className="btn btn-success">Save</button>
                    </div>                     
                </div>        
                <ol className="list-group list_of_items">
                    {this.state.list.map(l => 
                    <li key={l.id} className="list-group-item" data-toggle="modal" data-target="#editModal">
                        <div className="text_holder">
                            <input onChange={this.editItem.bind(this,l.id)} value={l.value} className="form-control" type="text" placeholder=".form-control-lg"></input>
                            <div className="btn-group pull-right">
                                <button onClick={this.removeItem.bind(this,l.id)} className="delete btn btn-warning">Delete</button>
                            </div>
                        </div>
                    </li>)}
                </ol>
            </div>
        );
    }
}