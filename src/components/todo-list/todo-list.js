import React, { Component } from "react";
import list from "../../storage/list.json"
import '../todo-list/todo-list.scss';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { list : list}
    }
    render() {
        return (
            <div>
                <ul className="list-group ">
                    {this.state.list.map(l => <li key={l.id} className="list-group-item" data-toggle="modal" data-target="#editModal">{l.value}<span className="glyphicon glyphicon-remove"></span></li>)}
                </ul>
            </div>
        );
    }
}