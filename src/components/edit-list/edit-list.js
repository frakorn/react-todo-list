import React, { Component } from "react";
import list from "../../storage/list.json"
import '../edit-list/edit-list.scss';
import { toast } from 'react-toastify';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

const SortableItem = SortableElement(({ list, editItem, removeItem }) => {
     return (
        <li key={list.id} className="list-group-item" data-toggle="modal" data-target="#editModal">
            <div className="input-group mb-3 drag">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faArrowsAlt} />
                    </span>
                </div>
                <div className="custom-file">
                    <input onChange={editItem.bind(this, list.id)} value={list.value} className="form-control" type="text" placeholder=".form-control-lg"></input>
                </div>
                <div className="input-group-prepend">
                    <button onClick={removeItem.bind(this, list.id)} className="delete btn btn-warning">Delete</button>
                </div>
            </div>
        </li>
    )
});

const SortableList = SortableContainer(({ items, removeItem, editItem }) => {
    return (
        <ol className="list-group list_of_items">
            {items.map((list,i) => (
                <SortableItem editItem={editItem}
                    removeItem={removeItem}
                    editItem={editItem}
                    key={`item-${list.id}`}
                    index={i}
                    list={list} />
            ))}
        </ol>
    );
});

export default class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = { list: JSON.parse(localStorage.getItem('list')) || list };
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ list }) => ({
            list: arrayMove(list, oldIndex, newIndex),
        }));
    };

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
    editItem = (id, el) => {
        let list = this.state.list;
        list.map((l, j) => l.value = l.id === id ? el.target.value : l.value);
        this.setState({ list: list });
    }
    save = () => {
        try {
            localStorage.setItem('list', JSON.stringify(this.state.list));
            toast.success("Saved")
        }
        catch (e) {
            toast.error("Error")
        }
    }
    render() {
        return (
            <div className="edit-list">
                <div className="row padding">
                    <div className="col align-right">
                        <button onClick={this.addItem} type="button" className="btn btn-info">Add</button>
                    </div>
                    <div className="col align-left">
                        <button onClick={this.save} type="button" className="btn btn-success">Save</button>
                    </div>
                </div>
                <SortableList removeItem={this.removeItem}
                    editItem={this.editItem}
                    items={this.state.list}
                    onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}