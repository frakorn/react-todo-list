import React, { Component } from "react";
import '../todo-list/todo-list.scss';
import { connect } from 'react-redux';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { list : JSON.parse(localStorage.getItem('list')) || this.props.list}
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
const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}
// add connect function to make TodoList an high order component, in order to take the redux store as input props
export default connect(mapStateToProps)(TodoList)