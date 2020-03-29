import React, { Component } from "react";
import list from "../../storage/list.json"
import '../todo-list/todo-list.scss';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { list : JSON.parse(localStorage.getItem('list')) || list}
    }
    cancelItem = (elem) => {
        elem.target.classList.toggle('removed');
    }
    render() {
        return (
            <div className="todo-list">
                <ul className="list-group ">
                    {this.state.list.map(l => <li key={l.id} className="list-group-item" data-toggle="modal" onClick={this.cancelItem} data-target="#editModal">{l.value}</li>)}
                </ul>
            </div>
        );
    }
}

export default TodoList;