import React, { Component } from "react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
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
                    <input onChange={editItem.bind(this, list.id)} value={list.value} className="form-control" type="text" placeholder="type..."></input>
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

export default class Sortable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <SortableList items={this.props.items}
                            removeItem={this.props.removeItem}
                            editItem={this.props.editItem}
                            onSortEnd={this.props.onSortEnd} />;
    }
}